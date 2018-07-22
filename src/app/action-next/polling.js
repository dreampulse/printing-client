// @flow

import uniqueId from 'lodash/uniqueId'
import type {
  Action,
  PollingId,
  PollingFunction,
  PollingArgs,
  PollingResult,
  PollingOnSuccessActionCreator,
  PollingOnFailActionCreator
} from '../type-next'

type StartAction = Action<
  'POLLING.START',
  {
    pollingId: PollingId,
    pollingFunction: PollingFunction,
    pollingArgs: PollingArgs,
    onSuccessActionCreator: PollingOnSuccessActionCreator,
    onFailActionCreator: PollingOnFailActionCreator,
    retryInterval: number,
    maxRetries: number
  }
>
type HandleResult = Action<
  'POLLING.HANDLE_RESULT',
  {pollingId: PollingId, pollingResult: PollingResult}
>
type HandleRetryAction = Action<'POLLING.HANDLE_RETRY', {pollingId: PollingId}>
type CancelAction = Action<'POLLING.CANCEL', {pollingId: PollingId}>

export type PollingAction = StartAction | HandleResult | HandleRetryAction | CancelAction

export const start = (
  pollingFunction: PollingFunction,
  pollingArgs: PollingArgs,
  onSuccessActionCreator: PollingOnSuccessActionCreator,
  onFailActionCreator: PollingOnSuccessActionCreator,
  retryInterval: number,
  maxRetries: number = Infinity
): StartAction => ({
  type: 'POLLING.START',
  payload: {
    pollingId: uniqueId('polling-id-'),
    pollingFunction,
    pollingArgs,
    onSuccessActionCreator,
    onFailActionCreator,
    retryInterval,
    maxRetries
  }
})

export const handleResult = (pollingId: PollingId, pollingResult: PollingResult): HandleResult => ({
  type: 'POLLING.HANDLE_RESULT',
  payload: {
    pollingId,
    pollingResult
  }
})

export const handleRetry = (pollingId: PollingId): HandleRetryAction => ({
  type: 'POLLING.HANDLE_RETRY',
  payload: {
    pollingId
  }
})

export const cancel = (pollingId: PollingId): CancelAction => ({
  type: 'POLLING.CANCEL',
  payload: {
    pollingId
  }
})
