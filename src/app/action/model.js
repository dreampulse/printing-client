import {createAction} from 'redux-actions'

import TYPE from '../../../src/app/type'
import * as printingEngine from '../lib/printing-engine'
import pollApi from '../lib/poll-api'

export const upload = (form, onProgressChange) => dispatch => {
  return printingEngine.uploadModel(form, onProgressChange)
}

export const modelUploaded = ({modelId}) => async dispatch => {
  dispatch(createAction(TYPE.MODEL.UPLOAD_STARTED)(modelId))
  try {
    await pollApi(printingEngine.getUploadStatus({modelId}))
    dispatch(createAction(TYPE.MODEL.UPLOAD_FINISHED)())
  } catch (e) {
    dispatch(createAction(TYPE.MODEL.UPLOAD_ABORTED)())
  }
}
