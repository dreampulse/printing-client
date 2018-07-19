// @flow

import type {
  Action,
  ModelConfigUploaded,
  MaterialConfigId,
  PriceId,
  BackendQuote
} from '../type-next'

type ReceiveQuotesPayload = {
  modelConfigs: Array<ModelConfigUploaded>,
  countryCode: string,
  currency: string,
  materialConfigIds: Array<MaterialConfigId>
}
type ReceiveQuotesAction = Action<'QUOTE.RECEIVE_QUOTES', ReceiveQuotesPayload>
type StartPollingQuotesAction = Action<'QUOTE.START_POLLING_QUOTES', {priceId: PriceId}>
type ReceiveQuotesResponse = Action<'QUOTE.RECEIVE_QUOTES_RESPONSE', Array<BackendQuote>>
type ReceiveQuotesComplete = Action<'QUOTE.RECEIVE_QUOTES_COMPLETE', Array<BackendQuote>>
type StopReceivingQuotes = Action<'QUOTE.STOP_RECEIVING_QUOTES', void>

export type QuoteAction =
  | ReceiveQuotesAction
  | StartPollingQuotesAction
  | ReceiveQuotesResponse
  | ReceiveQuotesComplete
  | StopReceivingQuotes

// Notes:
// Use selectFilteredModelConfigs() to determine modelConfigs param
// Use selectAllMaterialConfigIds() to determine materialConfigIds
// This is implemented as a singleton, you can not start multiple price requests in parallel
export const receiveQuotes = (payload: ReceiveQuotesPayload): ReceiveQuotesAction => ({
  type: 'QUOTE.RECEIVE_QUOTES',
  payload
})

export const startPollingQuotes = (payload: {priceId: PriceId}): StartPollingQuotesAction => ({
  type: 'QUOTE.START_POLLING_QUOTES',
  payload
})

export const receiveQuotesResponse = (payload: Array<BackendQuote>): ReceiveQuotesResponse => ({
  type: 'QUOTE.RECEIVE_QUOTES_RESPONSE',
  payload
})

export const receiveQuotesComplete = (payload: Array<BackendQuote>): ReceiveQuotesComplete => ({
  type: 'QUOTE.RECEIVE_QUOTES_COMPLETE',
  payload
})

export const stopReceivingQuotes = (): StopReceivingQuotes => ({
  type: 'QUOTE.STOP_RECEIVING_QUOTES',
  payload: undefined
})
