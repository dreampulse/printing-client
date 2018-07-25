// @flow

import {loop, Cmd} from 'redux-loop'
import keyBy from 'lodash/keyBy'
import * as printingEngine from '../lib/printing-engine'
import type {PriceRequest} from '../lib/printing-engine'
import type {AppAction, QuoteId, BackendQuote, PollingId} from '../type-next'
import * as coreAction from '../action-next/core'
import * as pollingAction from '../action-next/polling'
import * as quoteAction from '../action-next/quote'

export type QuoteState = {
  quotes: {[id: QuoteId]: BackendQuote},
  pollingId: ?PollingId,
  printingServiceComplete: {
    [printingServiceName: string]: boolean
  }
}

const initialState: QuoteState = {
  pollingId: null,
  quotes: {},
  printingServiceComplete: {}
}

const receiveQuotes = (state, {payload: {countryCode, currency, modelConfigs, refresh}}) => {
  const priceRequest: PriceRequest = {
    refresh,
    countryCode,
    currency,
    models: modelConfigs.map(modelConfig => ({
      modelId: modelConfig.modelId,
      quantity: modelConfig.quantity
    }))
  }

  const createPriceRequestCmd = Cmd.run(printingEngine.createPriceRequest, {
    args: [priceRequest],
    successActionCreator: quoteAction.startPollingQuotes,
    failActionCreator: coreAction.fatalError
  })

  // Is polling still in progress
  if (state.pollingId) {
    // Cancel old polling, start a new one
    const cancelPollingCmd = Cmd.action(pollingAction.cancel(state.pollingId))
    return loop(state, Cmd.list([cancelPollingCmd, createPriceRequestCmd], {sequence: true}))
  }

  // Start a new price request
  return loop(state, createPriceRequestCmd)
}

const startPollingQuotes = (state, {payload: {priceId}}) => {
  const startPollingAction = pollingAction.start({
    pollingFunction: async () => {
      const quotesResponse = await printingEngine.getQuotes(priceId)
      if (quotesResponse.allComplete) {
        return {
          status: 'POLLING_DONE',
          result: quotesResponse
        }
      }

      // Continue polling to get more results
      return {
        status: 'POLLING_CONTINUE',
        result: quotesResponse
      }
    },
    onSuccessActionCreator: quoteAction.quotesComplete,
    onPartialResultActionCreator: quoteAction.quotesReceived,
    onFailActionCreator: coreAction.fatalError
  })

  return loop(
    {
      ...state,
      pollingId: startPollingAction.payload.pollingId
    },
    Cmd.action(startPollingAction)
  )
}

const quotesReceived = (state, {payload: {quotes, printingServiceComplete}}) => ({
  ...state,
  quotes: {
    ...state.quotes,
    ...keyBy(quotes, 'quoteId')
  },
  printingServiceComplete
})

const quotesComplete = (state, {payload}) =>
  loop({...state, pollingId: null}, Cmd.action(quoteAction.quotesReceived(payload)))

const stopReceivingQuotes = state => {
  if (state.pollingId) {
    return loop({...state, pollingId: null}, Cmd.action(pollingAction.cancel(state.pollingId)))
  }
  // Ignore if no polling is active
  return state
}

export const reducer = (state: QuoteState = initialState, action: AppAction): QuoteState => {
  switch (action.type) {
    case 'QUOTE.RECEIVE_QUOTES':
      return receiveQuotes(state, action)
    case 'QUOTE.START_POLLING_QUOTES':
      return startPollingQuotes(state, action)
    case 'QUOTE.QUOTES_RECEIVED':
      return quotesReceived(state, action)
    case 'QUOTE.QUOTES_COMPLETE':
      return quotesComplete(state, action)
    case 'QUOTE.STOP_RECEIVING_QUOTES':
      return stopReceivingQuotes(state)
    default:
      return state
  }
}

export default reducer
