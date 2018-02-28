// @flow

import omit from 'lodash/omit'
import {loop, Cmd} from 'redux-loop'
import invariant from 'invariant'
import type {
  AppAction,
  TimeoutId,
  PollingId,
  PollingFunction,
  PollingArgs,
  PollingOnSuccessActionCreator
} from '../type-next'
import * as pollingAction from '../action-next/polling'
import * as timeoutAction from '../action-next/timeout'

export type PollingState = {
  activePollings: {
    [id: PollingId]: {
      pollingFunction: PollingFunction,
      pollingArgs: PollingArgs,
      onSuccessActionCreator: PollingOnSuccessActionCreator,
      retryInterval: number,
      remainingRetries: number,
      timeoutId: TimeoutId | null,
      currentState: 'POLLING' | 'WAITING_FOR_NEXT_RETRY'
    }
  }
}

const initialState: PollingState = {
  activePollings: {}
}

const startTry = (state, pollingId, activePolling) => {
  const {pollingFunction, pollingArgs} = activePolling

  return loop(
    {
      ...state,
      activePollings: {
        ...state.activePollings,
        [pollingId]: {
          ...activePolling,
          timeoutId: null,
          currentState: 'POLLING'
        }
      }
    },
    Cmd.run(pollingFunction, {
      args: pollingArgs,
      successActionCreator: pollingResult => pollingAction.handleSuccess(pollingId, pollingResult),
      failActionCreator: error => pollingAction.handleFail(pollingId, error)
    })
  )
}

const assertActivePollingInState = (handler, state, action, pollingState) => {
  const {pollingId} = action.payload
  const activePolling = state.activePollings[pollingId]

  invariant(activePolling, `Error in ${handler}(): There is no active polling with id ${pollingId}`)
  invariant(
    activePolling.currentState === pollingState,
    `Error in ${handler}(): Polling with id ${pollingId} is in unexpected state ${activePolling.currentState}`
  )
}

const start = (state, action) => {
  const {
    pollingId,
    pollingFunction,
    pollingArgs,
    onSuccessActionCreator,
    retryInterval,
    maxRetries
  } = action.payload

  invariant(
    pollingId in state.activePollings === false,
    `Error in start(): There is already an active polling with id ${pollingId}`
  )

  return startTry(state, pollingId, {
    pollingFunction,
    pollingArgs,
    onSuccessActionCreator,
    retryInterval,
    remainingRetries: maxRetries
  })
}

const handleSuccess = (state, action) => {
  const {pollingId, pollingResult} = action.payload

  if (pollingId in state.activePollings === false) {
    return state
  }
  assertActivePollingInState('handleSuccess', state, action, 'POLLING')

  const activePolling = state.activePollings[pollingId]

  return loop(
    {
      ...state,
      activePollings: omit(state.activePollings, pollingId)
    },
    Cmd.action(activePolling.onSuccessActionCreator(pollingResult))
  )
}

const handleFailNoRemainingRetries = (state, action) => {
  const {pollingId} = action.payload

  return {
    ...state,
    activePollings: omit(state.activePollings, pollingId)
  }
}

const handleFailWithRemainingRetries = (state, action) => {
  const {pollingId} = action.payload
  const activePolling = state.activePollings[pollingId]
  const {retryInterval} = activePolling
  const onTimeoutEndActionCreator = () => pollingAction.handleRetry(pollingId)
  const timeoutStartAction = timeoutAction.start(onTimeoutEndActionCreator, retryInterval)

  return loop(
    {
      ...state,
      activePollings: {
        ...state.activePollings,
        [pollingId]: {
          ...activePolling,
          timeoutId: timeoutStartAction.payload.timeoutId,
          currentState: 'WAITING_FOR_NEXT_RETRY'
        }
      }
    },
    Cmd.action(timeoutStartAction)
  )
}

const handleFail = (state, action) => {
  const {pollingId} = action.payload

  if (pollingId in state.activePollings === false) {
    return state
  }
  assertActivePollingInState('handleFail', state, action, 'POLLING')

  const activePolling = state.activePollings[pollingId]

  return activePolling.remainingRetries === 0
    ? handleFailNoRemainingRetries(state, action)
    : handleFailWithRemainingRetries(state, action)
}

const handleRetry = (state, action) => {
  assertActivePollingInState('retry', state, action, 'WAITING_FOR_NEXT_RETRY')

  const {pollingId} = action.payload
  const activePolling = state.activePollings[pollingId]

  return startTry(state, pollingId, {
    ...activePolling,
    remainingRetries: activePolling.remainingRetries - 1,
    timeoutId: null,
    currentState: 'POLLING'
  })
}

const cancel = (state, action) => {
  const {pollingId} = action.payload
  const activePollings = state.activePollings

  if (pollingId in activePollings === false) {
    return state
  }

  const activePolling = activePollings[pollingId]
  const newState = {
    ...state,
    activePollings: omit(activePollings, pollingId)
  }

  return activePolling.timeoutId === null
    ? newState
    : loop(newState, Cmd.action(timeoutAction.cancel(activePolling.timeoutId)))
}

export const reducer = (state: PollingState = initialState, action: AppAction): PollingState => {
  switch (action.type) {
    case 'POLLING.START':
      return start(state, action)
    case 'POLLING.HANDLE_SUCCESS':
      return handleSuccess(state, action)
    case 'POLLING.HANDLE_FAIL':
      return handleFail(state, action)
    case 'POLLING.HANDLE_RETRY':
      return handleRetry(state, action)
    case 'POLLING.CANCEL':
      return cancel(state, action)
    default:
      return state
  }
}

export default reducer
