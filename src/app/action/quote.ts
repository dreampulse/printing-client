import {Action, ModelConfigUploaded, PriceId, Quote} from '../type'

type ReceiveQuotesPayload = {
  modelConfigs: ModelConfigUploaded[]
  countryCode: string
  currency: string
  refresh: boolean
}

type QuotesReceivedPayload = {
  quotes: Quote[]
  printingServiceComplete: {
    [printingServiceName: string]: boolean
  }
}

export type ReceiveQuotesAction = Action<'QUOTE.RECEIVE_QUOTES', ReceiveQuotesPayload>
export type StartPollingQuotesAction = Action<'QUOTE.START_POLLING_QUOTES', {priceId: PriceId}>
export type QuotesReceivedAction = Action<'QUOTE.QUOTES_RECEIVED', QuotesReceivedPayload>
export type QuotesCompleteAction = Action<'QUOTE.QUOTES_COMPLETE', QuotesReceivedPayload>
export type StopReceivingQuotesAction = Action<'QUOTE.STOP_RECEIVING_QUOTES', void>
export type GoingToReceiveQuotesAction = Action<'QUOTE.GOING_TO_RECEIVE_QUOTES', void>

export type QuoteAction =
  | ReceiveQuotesAction
  | StartPollingQuotesAction
  | QuotesReceivedAction
  | QuotesCompleteAction
  | StopReceivingQuotesAction
  | GoingToReceiveQuotesAction

// Internal actions

export const startPollingQuotes = (payload: {priceId: PriceId}): StartPollingQuotesAction => ({
  type: 'QUOTE.START_POLLING_QUOTES',
  payload
})

export const quotesReceived = (payload: QuotesReceivedPayload): QuotesReceivedAction => ({
  type: 'QUOTE.QUOTES_RECEIVED',
  payload
})

export const quotesComplete = (payload: QuotesReceivedPayload): QuotesCompleteAction => ({
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

export const goingToReceiveQuotes = (): GoingToReceiveQuotesAction => ({
  type: 'QUOTE.GOING_TO_RECEIVE_QUOTES',
  payload: undefined
})

export const stopReceivingQuotes = (): StopReceivingQuotesAction => ({
  type: 'QUOTE.STOP_RECEIVING_QUOTES',
  payload: undefined
})
