import {createAction} from 'redux-actions'

import TYPE from './type'

// Model
export const modelUploadToBackendStarted = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_STARTED)
export const modelUploadToBackendProgressed = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_PROGRESSED)
export const modelUploadToBackendFinished = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED)

export const modelCheckStatusStarted = createAction(TYPE.MODEL.CHECK_STATUS_STARTED)
export const modelCheckStatusFinished = createAction(TYPE.MODEL.CHECK_STATUS_FINISHED)
