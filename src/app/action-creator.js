import {createAction} from 'redux-actions'

import TYPE from './type'

// Model
export const modelUploadToBackendStarted = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_STARTED)
export const modelUploadToBackendProgressed = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_PROGRESSED)
export const modelUploadToBackendFinished = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED)
export const modelUploadToBackendFailed = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_FAILED)
export const modelCheckStatusStarted = createAction(TYPE.MODEL.CHECK_STATUS_STARTED)
export const modelCheckStatusFinished = createAction(TYPE.MODEL.CHECK_STATUS_FINISHED)

// Material
export const materialSelected = createAction(TYPE.MATERIAL.SELECTED)
export const materialReceived = createAction(TYPE.MATERIAL.RECEIVED)

// User
export const userAddressChanged = createAction(TYPE.USER.SHIPPING_ADDRESS_CHANGED)
export const userCreated = createAction(TYPE.USER.CREATED)
export const userUpdated = createAction(TYPE.USER.UPDATED)

// Price
export const priceRequested = createAction(TYPE.PRICE.REQUESTED)
export const priceReceived = createAction(TYPE.PRICE.RECEIVED)

// Cart
export const cartSelectVendor = createAction(TYPE.CART.VENDOR_SELECTED)
export const cartSelectShipping = createAction(TYPE.CART.SHIPPING_SELECTED)
export const cartChangeQuantity = createAction(TYPE.CART.QUANTITY_CHANGED)
export const cartCreated = createAction(TYPE.CART.CREATED)
export const cartReceivedFinalPrice = createAction(TYPE.CART.RECEIVED_FINAL_PRICE)

// Order
export const orderOrdered = createAction(TYPE.ORDER.ORDERED)
