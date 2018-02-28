// @flow

import uniqueId from 'lodash/uniqueId'
import type {
  Action,
  PollingId,
  PollingFunction,
  PollingArgs,
  PollingResult,
  PollingOnSuccessActionCreator
} from '../type-next'

type StartAction = Action<
  'POLLING.START',
  {
    pollingId: PollingId,
    pollingFunction: PollingFunction,
    pollingArgs: PollingArgs,
    onSuccessActionCreator: PollingOnSuccessActionCreator,
    retryInterval: number,
    maxRetries: number
  }
>
type HandleSuccessAction = Action<
  'POLLING.HANDLE_SUCCESS',
  {pollingId: PollingId, pollingResult: PollingResult}
>
type HandleFailAction = Action<'POLLING.HANDLE_FAIL', {pollingId: PollingId, error: Error}>
type HandleRetryAction = Action<'POLLING.HANDLE_RETRY', {pollingId: PollingId}>
type CancelAction = Action<'POLLING.CANCEL', {pollingId: PollingId}>

export type PollingAction =
  | StartAction
  | HandleSuccessAction
  | HandleFailAction
  | HandleRetryAction
  | CancelAction

export const start = (
  pollingFunction: PollingFunction,
  pollingArgs: PollingArgs,
  onSuccessActionCreator: PollingOnSuccessActionCreator,
  retryInterval: number,
  maxRetries: number = Infinity
): StartAction => ({
  type: 'POLLING.START',
  payload: {
    pollingId: uniqueId('polling-id-'),
    pollingFunction,
    pollingArgs,
    onSuccessActionCreator,
    retryInterval,
    maxRetries
  }
})

export const handleSuccess = (
  pollingId: PollingId,
  pollingResult: PollingResult
): HandleSuccessAction => ({
  type: 'POLLING.HANDLE_SUCCESS',
  payload: {
    pollingId,
    pollingResult
  }
})

export const handleFail = (pollingId: PollingId, error: Error): HandleFailAction => ({
  type: 'POLLING.HANDLE_FAIL',
  payload: {
    pollingId,
    error
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
