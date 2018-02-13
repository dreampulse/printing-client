// @flow

import uniqueId from 'lodash/uniqueId'
import type {Action, TimeoutId, TimeoutOnEndActionCreator} from '../type-next'

type StartAction = Action<
  'TIMEOUT.START',
  {timeoutId: TimeoutId, onEndActionCreator: TimeoutOnEndActionCreator, delay: number}
>
type CancelAction = Action<'TIMEOUT.CANCEL', {timeoutId: TimeoutId}>
type DebounceAction = Action<'TIMEOUT.DEBOUNCE', {timeoutId: TimeoutId, delay: number}>
type InitiatorAction = StartAction | DebounceAction
type EndAction = Action<'TIMEOUT.END', {initiatorAction: InitiatorAction}>

export type TimeoutAction = StartAction | EndAction | DebounceAction | CancelAction

export const start = (
  onEndActionCreator: TimeoutOnEndActionCreator,
  delay: number
): StartAction => ({
  type: 'TIMEOUT.START',
  payload: {
    timeoutId: uniqueId('timeout-id-'),
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

export const debounce = (timeoutId: TimeoutId, delay: number): DebounceAction => ({
  type: 'TIMEOUT.DEBOUNCE',
  payload: {
    timeoutId,
    delay
  }
})

export const end = (initiatorAction: InitiatorAction): EndAction => ({
  type: 'TIMEOUT.END',
  payload: {
    initiatorAction
  }
})
