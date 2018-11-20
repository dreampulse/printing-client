import uniqueId from 'lodash/uniqueId'
import {Action, TimeoutId, TimeoutCallId, TimeoutOnEndActionCreator} from '../type'

export type StartAction = Action<
  'TIMEOUT.START',
  {
    timeoutId: TimeoutId
    timeoutCallId: TimeoutCallId
    onEndActionCreator: TimeoutOnEndActionCreator
    delay: number
  }
>
export type CancelAction = Action<'TIMEOUT.CANCEL', {timeoutId: TimeoutId}>
export type HandleEndAction = Action<'TIMEOUT.HANDLE_END', {timeoutCallId: TimeoutCallId}>

export type TimeoutAction = StartAction | CancelAction | HandleEndAction

export const start = (
  onEndActionCreator: TimeoutOnEndActionCreator,
  delay: number,
  timeoutId: string = uniqueId('timeout-id-')
): StartAction => ({
  type: 'TIMEOUT.START',
  payload: {
    timeoutCallId: uniqueId('timeout-call-id-'),
    timeoutId,
    onEndActionCreator,
    delay
  }
})

export const cancel = (timeoutId: TimeoutId): CancelAction => ({
  type: 'TIMEOUT.CANCEL',
  payload: {
    timeoutId
  }
})

export const handleEnd = (timeoutCallId: TimeoutCallId): HandleEndAction => ({
  type: 'TIMEOUT.HANDLE_END',
  payload: {
    timeoutCallId
  }
})
