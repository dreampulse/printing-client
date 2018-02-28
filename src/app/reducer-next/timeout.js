// @flow

import omit from 'lodash/omit'
import findKey from 'lodash/findKey'
import {loop, Cmd} from 'redux-loop'
import timeout from 'timeout-as-promise'
import type {AppAction, TimeoutId, TimeoutCallId, TimeoutOnEndActionCreator} from '../type-next'
import * as timeoutAction from '../action-next/timeout'

export type TimeoutState = {
  activeTimeouts: {
    [id: TimeoutId]: {
      timeoutCallId: TimeoutCallId,
      onEndActionCreator: TimeoutOnEndActionCreator
    }
  }
}

const initialState: TimeoutState = {
  activeTimeouts: {}
}

const start = (state, action) => {
  const {timeoutId, timeoutCallId, delay, onEndActionCreator} = action.payload

  return loop(
    {
      ...state,
      activeTimeouts: {
        ...state.activeTimeouts,
        [timeoutId]: {
          timeoutCallId,
          onEndActionCreator
        }
      }
    },
    Cmd.run(timeout, {
      args: [delay],
      successActionCreator: () => timeoutAction.handleEnd(timeoutCallId)
    })
  )
}

const cancel = (state, action) => {
  const {timeoutId} = action.payload

  return timeoutId in state.activeTimeouts
    ? {
        ...state,
        activeTimeouts: omit(state.activeTimeouts, timeoutId)
      }
    : state
}

const handleEnd = (state, action) => {
  const {timeoutCallId} = action.payload
  const timeoutId = findKey(state.activeTimeouts, t => t.timeoutCallId === timeoutCallId)

  if (typeof timeoutId !== 'string') {
    return state
  }

  const activeTimeout = state.activeTimeouts[timeoutId]

  return loop(
    {
      ...state,
      activeTimeouts: omit(state.activeTimeouts, timeoutId)
    },
    Cmd.action(activeTimeout.onEndActionCreator())
  )
}

export const reducer = (state: TimeoutState = initialState, action: AppAction): TimeoutState => {
  switch (action.type) {
    case 'TIMEOUT.START':
      return start(state, action)
    case 'TIMEOUT.CANCEL':
      return cancel(state, action)
    case 'TIMEOUT.HANDLE_END':
      return handleEnd(state, action)
    default:
      return state
  }
}

export default reducer
