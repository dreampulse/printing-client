import {createAction} from 'redux-actions'

import TYPE from './type'

// Model
export const modelUploadToBackendStarted = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_STARTED)
export const modelUploadToBackendProgressed = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_PROGRESSED)
export const modelUploadToBackendFinished = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED)

export const modelCheckStatusStarted = createAction(TYPE.MODEL.CHECK_STATUS_STARTED)
export const modelCheckStatusFinished = createAction(TYPE.MODEL.CHECK_STATUS_FINISHED)

// Material
export const materialSelected = createAction(TYPE.MATERIAL.SELECTED)
export const materialReceived = createAction(TYPE.MATERIAL.RECEIVED)

// User
export const userAddressChanged = createAction(TYPE.USER.SHIPPING_ADDRESS_CHANGED)
export const userAddressDetectionFailed = createAction(TYPE.USER.SHIPPING_ADDRESS_DETECTION_FAILED)
export const userCreated = createAction(TYPE.USER.CREATED)
export const userUpdated = createAction(TYPE.USER.UPDATED)
