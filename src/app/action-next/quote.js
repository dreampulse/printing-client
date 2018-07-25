// @flow

import type {Action, ModelConfigUploaded, PriceId, BackendQuote} from '../type-next'

type ReceiveQuotesPayload = {
  modelConfigs: Array<ModelConfigUploaded>,
  countryCode: string,
  currency: string,
  refresh: boolean
}

type QuotesReceivedPayload = {
  quotes: Array<BackendQuote>,
  printingServiceComplete: {
    [printingServiceName: string]: boolean
  }
}

type ReceiveQuotesAction = Action<'QUOTE.RECEIVE_QUOTES', ReceiveQuotesPayload>
type StartPollingQuotesAction = Action<'QUOTE.START_POLLING_QUOTES', {priceId: PriceId}>
type QuotesReceived = Action<'QUOTE.QUOTES_RECEIVED', QuotesReceivedPayload>
type QuotesComplete = Action<'QUOTE.QUOTES_COMPLETE', QuotesReceivedPayload>
type StopReceivingQuotes = Action<'QUOTE.STOP_RECEIVING_QUOTES', void>

export type QuoteAction =
  | ReceiveQuotesAction
  | StartPollingQuotesAction
  | QuotesReceived
  | QuotesComplete
  | StopReceivingQuotes

// Internal actions

export const startPollingQuotes = (payload: {priceId: PriceId}): StartPollingQuotesAction => ({
  type: 'QUOTE.START_POLLING_QUOTES',
  payload
})

export const quotesReceived = (payload: QuotesReceivedPayload): QuotesReceived => ({
  type: 'QUOTE.QUOTES_RECEIVED',
  payload
})

export const quotesComplete = (payload: QuotesReceivedPayload): QuotesComplete => ({
  type: 'QUOTE.QUOTES_COMPLETE',
  payload
})

// Public actions

// Notes:
// Use selectModelConfigsByIds() to determine modelConfigs param
// This is implemented as a singleton, you can not start multiple price requests in parallel
export const receiveQuotes = (payload: ReceiveQuotesPayload): ReceiveQuotesAction => ({
  type: 'QUOTE.RECEIVE_QUOTES',
  payload
})

export const stopReceivingQuotes = (): StopReceivingQuotes => ({
  type: 'QUOTE.STOP_RECEIVING_QUOTES',
  payload: undefined
})
