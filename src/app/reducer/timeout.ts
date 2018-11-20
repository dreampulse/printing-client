// @flow

import omit from 'lodash/omit'
import findKey from 'lodash/findKey'
import {loop, Cmd, Loop} from 'redux-loop'
// @ts-ignore
import timeout from 'timeout-as-promise'  // TODO: fix later and remove dependency
import {TimeoutCallId, TimeoutOnEndActionCreator} from '../type'
import {Actions} from '../action'
import * as timeoutActions from '../action/timeout'

export type TimeoutState = {
  activeTimeouts: {
    [timeoutId: string]: {
      timeoutCallId: TimeoutCallId,
      onEndActionCreator: TimeoutOnEndActionCreator
    }
  }
}

type TimeoutReducer = TimeoutState | Loop<TimeoutState, Actions>

const initialState: TimeoutState = {
  activeTimeouts: {}
}

const start = (state: TimeoutState, action: timeoutActions.StartAction): TimeoutReducer => {
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
      successActionCreator: () => timeoutActions.handleEnd(timeoutCallId)
    })
  )
}

const cancel = (state: TimeoutState, action: timeoutActions.CancelAction): TimeoutReducer => {
  const {timeoutId} = action.payload

  return timeoutId in state.activeTimeouts
    ? {
        ...state,
        activeTimeouts: omit(state.activeTimeouts, timeoutId)
      }
    : state
}

const handleEnd = (state: TimeoutState, action: timeoutActions.HandleEndAction): TimeoutReducer => {
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

export const reducer = (state: TimeoutState = initialState, action: Actions): TimeoutReducer => {
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
