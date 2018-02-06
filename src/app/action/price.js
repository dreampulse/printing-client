// @flow

import type {Dispatch} from 'redux'
import {createAction} from 'redux-actions'
import flatten from 'lodash/flatten'

import * as printingEngine from '../service/printing-engine'
import {getUpdatedOffer, getCheapestOfferFor} from '../lib/offer'
import {poll, debouncedPoll, stopPoll} from '../lib/poll'
import {selectFeatures} from '../lib/selector'
import {getMaterialConfigIdsOfMaterialGroup} from '../lib/material'
import {AppError} from '../lib/error'

import type {Offer, Price, State} from '../type'
import TYPE, {ERROR_TYPE} from '../action-type'
import {openFatalErrorModal} from './modal'

const POLL_NAME = 'price'
const RECALC_POLL_NAME = 'price_recalc'

// Sync actions

const clearOffers = createAction(TYPE.PRICE.CLEAR_OFFERS)
const priceRequested = createAction(TYPE.PRICE.REQUESTED, (priceId: string) => ({priceId}))
const priceReceived = createAction(TYPE.PRICE.RECEIVED, (price: Price, isComplete: boolean) => ({
  price,
  isComplete
}))
const priceTimeout = createAction(TYPE.PRICE.TIMEOUT)
export const selectOffer = createAction(TYPE.PRICE.SELECT_OFFER, (offer: ?Offer) => ({offer}))

// Asnyc actions

export const refreshSelectedOffer = () => (dispatch: Dispatch<*>, getState: () => State) => {
  const {price: {offers, selectedOffer}} = getState()

  if (selectedOffer) {
    const offer = offers ? getUpdatedOffer(selectedOffer, offers) : null
    // if (!offer) // TODO: show that offer is no longer available
    dispatch(selectOffer(offer))
  }
}

// @TODO: Improve interface
export const createPriceRequest = (
  {
    debounce = false
  }: {
    debounce: boolean
  } = {}
) => (dispatch: Dispatch<*>, getState: () => State): Promise<any> => {
  dispatch(clearOffers())

  const state = getState()
  if (!state.material.materialGroups) {
    throw new Error('Material groups missing')
  }
  const {material: {materialGroups}, model: {models}, user: {userId, currency}} = state
  const uploadStillInProgress = models.some(m => m.uploadFinished === false)

  // Abort if user did not upload any models yet
  if (models.length === 0 || uploadStillInProgress) {
    // Just to be sure, stop any running price polls
    stopPoll(POLL_NAME)
    return Promise.resolve()
  }

  const materialConfigIds = flatten(materialGroups.map(getMaterialConfigIdsOfMaterialGroup))
  const {refresh} = selectFeatures(state)
  const items = models.map(model => {
    // Makes Flow happy because according to our type specification, `models` may contain
    // models that have not been uploaded yet. We know, however, that `models` contains
    // fully uploaded models only at this point.
    // This will get better as soon as we've defined separate model types.
    if (!model.uploadFinished) throw new Error('Upload still in progress')

    const {modelId, quantity} = model
    return {
      modelId,
      materialConfigIds,
      quantity
    }
  })

  const options = {
    isEstimate: false, // always fetch real prices
    caching: true, // cache prices for next user
    refresh, // force refresh when requested
    userId,
    items,
    currency
  }

  const usePoll = debounce ? debouncedPoll : poll
  return usePoll(
    POLL_NAME,
    async priceId => {
      const {price, isComplete} = await printingEngine.getPriceWithStatus({priceId})
      dispatch(priceReceived(price, isComplete))
      return isComplete
    },
    async () => {
      const {priceId} = await printingEngine.createPriceRequest(options)
      dispatch(priceRequested(priceId))
      return priceId
    }
  )
    .then(() => {
      // We need to update the selectedOffer if applicable
      dispatch(refreshSelectedOffer())
    })
    .catch((error: Error) => {
      // Handle timeout separately
      if (error.type === ERROR_TYPE.POLL_TIMEOUT) {
        dispatch(priceTimeout(error))
        return
      }

      // Ignore special error when price request was overwritten or stopped
      if (error.type === ERROR_TYPE.POLL_OVERWRITTEN || error.type === ERROR_TYPE.POLL_STOPPED) {
        return
      }

      dispatch(
        openFatalErrorModal(new AppError(ERROR_TYPE.GET_PRICE_FAILED, 'Failed to get prices'))
      )
    })
}

export const recalculateSelectedOffer = () => (dispatch: Dispatch<*>, getState: () => State) => {
  const {model: {models}, price: {selectedOffer}, user: {userId, currency}} = getState()

  if (!selectedOffer) throw new Error('No offer selected')

  // Stop any other price polling
  stopPoll(POLL_NAME)

  const items = models.map(model => {
    if (!model.uploadFinished) throw new Error('Upload still in progress')
    const {modelId, quantity} = model
    return {
      modelId,
      materialConfigIds: [selectedOffer.materialConfigId],
      quantity
    }
  })

  const options = {
    isEstimate: false, // always get real price for recalculated offer
    caching: false, // do not cache price recalc with a single material/vendor
    vendorId: selectedOffer.printingService,
    userId,
    items,
    currency
  }

  return poll(
    RECALC_POLL_NAME,
    async (priceId: string) => {
      const {price} = await printingEngine.getPriceWithStatus({priceId})
      const updatedOffer =
        getUpdatedOffer(selectedOffer, price.offers) ||
        getCheapestOfferFor(
          selectedOffer.materialConfigId,
          selectedOffer.printingService,
          price.offers
        )

      if (!updatedOffer || updatedOffer.priceEstimated) {
        return false
      }

      dispatch(selectOffer(updatedOffer))

      return true
    },
    async () => {
      const {priceId} = await printingEngine.createPriceRequest(options)
      dispatch(priceRequested(priceId))
      return priceId
    }
  ).catch(() => {
    dispatch(
      openFatalErrorModal(
        new AppError(ERROR_TYPE.GET_PRICE_FAILED, 'failed to recalculate selected offer')
      )
    )
  })
}

export const createDebouncedPriceRequest = () =>
  createPriceRequest({debounce: true, refresh: false})
