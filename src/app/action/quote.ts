import {Action, ModelConfigUploaded, PriceId, Quote} from '../type'

type ReceiveQuotesPayload = {
  modelConfigs: ModelConfigUploaded[],
  countryCode: string,
  currency: string,
  refresh: boolean
}

type QuotesReceivedPayload = {
  quotes: Quote[],
  printingServiceComplete: {
    [printingServiceName: string]: boolean
  }
}

export type ReceiveQuotesAction = Action<'QUOTE.RECEIVE_QUOTES', ReceiveQuotesPayload>
export type StartPollingQuotesAction = Action<'QUOTE.START_POLLING_QUOTES', {priceId: PriceId}>
export type QuotesReceived = Action<'QUOTE.QUOTES_RECEIVED', QuotesReceivedPayload>
export type QuotesComplete = Action<'QUOTE.QUOTES_COMPLETE', QuotesReceivedPayload>
export type StopReceivingQuotes = Action<'QUOTE.STOP_RECEIVING_QUOTES', void>

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
