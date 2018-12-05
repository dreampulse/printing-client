import omit from 'lodash/omit'
import {loop, Cmd, ActionCmd, Loop} from 'redux-loop'
import invariant from 'invariant'
import {
  TimeoutId,
  PollingFunction,
  PollingArgs,
  PollingOnSuccessActionCreator,
  PollingOnFailActionCreator,
  PollingOnPartialResultActionCreator
} from '../type'
import {Actions} from '../action'
import * as pollingActions from '../action/polling'
import * as timeoutActions from '../action/timeout'

export type PollingState = {
  activePollings: {
    [pollingId: string]: {
      pollingFunction: PollingFunction
      pollingArgs: PollingArgs
      onSuccessActionCreator: PollingOnSuccessActionCreator
      onFailActionCreator: PollingOnFailActionCreator
      onPartialResultActionCreator: PollingOnPartialResultActionCreator
      retryInterval: number
      remainingRetries: number
      timeoutId: TimeoutId | null
      currentState: 'POLLING' | 'WAITING_FOR_NEXT_RETRY'
    }
  }
}

type PollingReducer = PollingState | Loop<PollingState, Actions>

const initialState: PollingState = {
  activePollings: {}
}

const startTry = (state: PollingState, pollingId: string, activePolling: any) => {
  const {pollingFunction, pollingArgs, onFailActionCreator} = activePolling

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
      successActionCreator: pollingResult => pollingActions.handleResult(pollingId, pollingResult),
      failActionCreator: onFailActionCreator
    })
  )
}

const assertActivePollingInState = (
  handler: string,
  state: PollingState,
  action: any,
  pollingState: string
) => {
  const {pollingId} = action.payload
  const activePolling = state.activePollings[pollingId]

  invariant(activePolling, `Error in ${handler}(): There is no active polling with id ${pollingId}`)
  invariant(
    activePolling.currentState === pollingState,
    `Error in ${handler}(): Polling with id ${pollingId} is in unexpected state ${
      activePolling.currentState
    }`
  )
}

const start = (state: PollingState, action: pollingActions.StartAction): PollingReducer => {
  const {
    pollingId,
    pollingFunction,
    pollingArgs,
    onSuccessActionCreator,
    onFailActionCreator,
    onPartialResultActionCreator,
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
    onFailActionCreator,
    onPartialResultActionCreator,
    retryInterval,
    remainingRetries: maxRetries
  })
}

const handleSuccess = (
  state: PollingState,
  action: pollingActions.HandleResultAction
): PollingReducer => {
  const {
    pollingId,
    pollingResult: {result}
  } = action.payload
  const activePolling = state.activePollings[pollingId]

  return loop(
    {
      ...state,
      activePollings: omit(state.activePollings, pollingId)
    },
    Cmd.action(activePolling.onSuccessActionCreator(result))
  )
}

const handleFailNoRemainingRetries = (
  state: PollingState,
  action: pollingActions.HandleResultAction
): PollingReducer => {
  const {pollingId} = action.payload

  return {
    ...state,
    activePollings: omit(state.activePollings, pollingId)
  }
}

const handleFailWithRemainingRetries = (
  state: PollingState,
  action: pollingActions.HandleResultAction
): PollingReducer => {
  const {
    pollingId,
    pollingResult: {result}
  } = action.payload
  const activePolling = state.activePollings[pollingId]
  const {retryInterval} = activePolling
  const onTimeoutEndActionCreator = () => pollingActions.handleRetry(pollingId)
  const timeoutStartAction = timeoutActions.start(onTimeoutEndActionCreator, retryInterval)

  const cmds: Array<ActionCmd<Actions>> = [Cmd.action(timeoutStartAction)]

  if (activePolling.onPartialResultActionCreator) {
    cmds.push(Cmd.action(activePolling.onPartialResultActionCreator(result)))
  }

  return loop<PollingState, Actions>(
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
    Cmd.list(cmds)
  )
}

const handleResult = (
  state: PollingState,
  action: pollingActions.HandleResultAction
): PollingReducer => {
  const {
    pollingId,
    pollingResult: {status}
  } = action.payload

  if (pollingId in state.activePollings === false) {
    return state
  }
  assertActivePollingInState('handleResult', state, action, 'POLLING')

  const activePolling = state.activePollings[pollingId]

  if (status === 'POLLING_CONTINUE') {
    return activePolling.remainingRetries === 0
      ? handleFailNoRemainingRetries(state, action)
      : handleFailWithRemainingRetries(state, action)
  }

  return handleSuccess(state, action)
}

const handleRetry = (
  state: PollingState,
  action: pollingActions.HandleRetryAction
): PollingReducer => {
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

const cancel = (state: PollingState, action: pollingActions.CancelAction): PollingReducer => {
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
    : loop(newState, Cmd.action(timeoutActions.cancel(activePolling.timeoutId)))
}

const reset = (state: PollingState): PollingReducer =>
  loop(
    state,
    Cmd.list(
      Object.keys(state.activePollings).map(pollingId =>
        Cmd.action(pollingActions.cancel(pollingId))
      )
    )
  )

export const reducer = (state: PollingState = initialState, action: Actions): PollingReducer => {
  switch (action.type) {
    case 'POLLING.START':
      return start(state, action)
    case 'POLLING.HANDLE_RESULT':
      return handleResult(state, action)
    case 'POLLING.HANDLE_RETRY':
      return handleRetry(state, action)
    case 'POLLING.CANCEL':
      return cancel(state, action)
    case 'CORE.RESET':
      return reset(state)
    default:
      return state
  }
}

export default reducer
