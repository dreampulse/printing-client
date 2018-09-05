// @flow

import uniqueId from 'lodash/uniqueId'
import type {
  Action,
  PollingId,
  PollingFunction,
  PollingArgs,
  PollingResult,
  PollingOnSuccessActionCreator,
  PollingOnFailActionCreator,
  PollingOnPartialResultActionCreator
} from '../type'

import config from '../../../config'

type StartActionParams = {
  pollingFunction: PollingFunction,
  pollingArgs?: PollingArgs,
  onSuccessActionCreator: PollingOnSuccessActionCreator,
  onFailActionCreator: PollingOnFailActionCreator,
  onPartialResultActionCreator?: PollingOnPartialResultActionCreator,
  retryInterval?: number,
  maxRetries?: number
}
type StartActionPayload = {
  pollingId: PollingId,
  retryInterval: number,
  maxRetries: number
} & StartActionParams

type StartAction = Action<'POLLING.START', StartActionPayload>
type HandleResult = Action<
  'POLLING.HANDLE_RESULT',
  {pollingId: PollingId, pollingResult: PollingResult}
>
type HandleRetryAction = Action<'POLLING.HANDLE_RETRY', {pollingId: PollingId}>
type CancelAction = Action<'POLLING.CANCEL', {pollingId: PollingId}>

export type PollingAction = StartAction | HandleResult | HandleRetryAction | CancelAction

export const start = (params: StartActionParams): StartAction => {
  const payload: StartActionPayload = {
    pollingId: uniqueId('polling-id-'),
    pollingFunction: params.pollingFunction,
    pollingArgs: params.pollingArgs || [],
    onSuccessActionCreator: params.onSuccessActionCreator,
    onFailActionCreator: params.onFailActionCreator,
    onPartialResultActionCreator: params.onPartialResultActionCreator,
    retryInterval: params.retryInterval || config.pollingInterval,
    maxRetries: params.maxRetries || config.pollingRetries
  }
  return {
    type: 'POLLING.START',
    payload
  }
}

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