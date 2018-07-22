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
  materialConfigIds: Array<MaterialConfigId>,
  refresh: boolean
}

type QuotesResponsePayload = {
  quotes: Array<BackendQuote>,
  printingServiceComplete: {
    [printingServiceName: string]: boolean
  }
}

type ReceiveQuotesAction = Action<'QUOTE.RECEIVE_QUOTES', ReceiveQuotesPayload>
type StartPollingQuotesAction = Action<'QUOTE.START_POLLING_QUOTES', {priceId: PriceId}>
type QuotesResponse = Action<'QUOTE.QUOTES_RESPONSE', QuotesResponsePayload>
type QuotesComplete = Action<'QUOTE.QUOTES_COMPLETE', QuotesResponsePayload>
type StopReceivingQuotes = Action<'QUOTE.STOP_RECEIVING_QUOTES', void>

export type QuoteAction =
  | ReceiveQuotesAction
  | StartPollingQuotesAction
  | QuotesResponse
  | QuotesComplete
  | StopReceivingQuotes

// Internal actions

export const startPollingQuotes = (payload: {priceId: PriceId}): StartPollingQuotesAction => ({
  type: 'QUOTE.START_POLLING_QUOTES',
  payload
})

export const quotesResponse = (payload: QuotesResponsePayload): QuotesResponse => ({
  type: 'QUOTE.QUOTES_RESPONSE',
  payload
})

export const quotesComplete = (payload: QuotesResponsePayload): QuotesComplete => ({
  type: 'QUOTE.QUOTES_COMPLETE',
  payload
})

// Public actions

// Notes:
// Use selectFilteredModelConfigs() to determine modelConfigs param
// Use selectAllMaterialConfigIds() to determine materialConfigIds
// This is implemented as a singleton, you can not start multiple price requests in parallel
export const receiveQuotes = (payload: ReceiveQuotesPayload): ReceiveQuotesAction => ({
  type: 'QUOTE.RECEIVE_QUOTES',
  payload
})

export const stopReceivingQuotes = (): StopReceivingQuotes => ({
  type: 'QUOTE.STOP_RECEIVING_QUOTES',
  payload: undefined
})
