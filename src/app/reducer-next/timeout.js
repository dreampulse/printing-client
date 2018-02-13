// @flow

import omit from 'lodash/omit'
import {loop, Cmd} from 'redux-loop'
import timeout from 'timeout-as-promise'
import invariant from 'invariant'
import type {AppAction, TimeoutId, TimeoutOnEndActionCreator} from '../type-next'
import * as timeoutAction from '../action-next/timeout'

type InitiatorAction = {}

export type TimeoutState = {
  activeTimeouts: {
    [id: TimeoutId]: {
      initiatorAction: InitiatorAction,
      onEndActionCreator: TimeoutOnEndActionCreator
    }
  }
}

const initialState: TimeoutState = {
  activeTimeouts: {}
}

const assertActiveTimeout = (handler, state, action) => {
  const {timeoutId} = action.payload
  const activeTimeout = state.activeTimeouts[timeoutId]

  invariant(activeTimeout, `Error in ${handler}(): There is no active timeout with id ${timeoutId}`)

  return activeTimeout
}

const start = (state, action) => {
  const {timeoutId, delay, onEndActionCreator} = action.payload

  invariant(
    timeoutId in state.activeTimeouts === false,
    `Error in start(): There is already an active timeout with id ${timeoutId}`
  )

  return loop(
    {
      ...state,
      activeTimeouts: {
        ...state.activeTimeouts,
        [timeoutId]: {
          initiatorAction: action,
          onEndActionCreator
        }
      }
    },
    Cmd.run(timeout, {
      args: [delay],
      successActionCreator: () => timeoutAction.end(action)
    })
  )
}

const debounce = (state, action) => {
  const {timeoutId, delay} = action.payload
  const activeTimeout = assertActiveTimeout('debounce', state, action)

  return loop(
    {
      ...state,
      activeTimeouts: {
        ...state.activeTimeouts,
        [timeoutId]: {
          ...activeTimeout,
          initiatorAction: action
        }
      }
    },
    Cmd.run(timeout, {
      args: [delay],
      successActionCreator: () => timeoutAction.end(action)
    })
  )
}

const cancel = (state, action) => {
  const {timeoutId} = action.payload

  return {
    ...state,
    activeTimeouts: omit(state.activeTimeouts, timeoutId)
  }
}

const end = (state, action) => {
  const {initiatorAction} = action.payload
  const {timeoutId} = initiatorAction.payload
  const activeTimeout = state.activeTimeouts[timeoutId]

  return activeTimeout && activeTimeout.initiatorAction === initiatorAction
    ? loop(
        {
          ...state,
          activeTimeouts: omit(state.activeTimeouts, timeoutId)
        },
        Cmd.action(activeTimeout.onEndActionCreator())
      )
    : state
}

export const reducer = (state: TimeoutState = initialState, action: AppAction): TimeoutState => {
  switch (action.type) {
    case 'TIMEOUT.START':
      return start(state, action)
    case 'TIMEOUT.CANCEL':
      return cancel(state, action)
    case 'TIMEOUT.DEBOUNCE':
      return debounce(state, action)
    case 'TIMEOUT.END':
      return end(state, action)
    default:
      return state
  }
}

export default reducer
