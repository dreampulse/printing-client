import {createAction} from 'redux-actions';

import TYPE from '../../../src/app/type';

export default ({printingEngine}) => {
  const upload = (form, onProgressChange) => dispatch => {
    return printingEngine.uploadModel(form, onProgressChange)
  }

  const modelUploaded = ({modelId}) => async dispatch => {
    dispatch(createAction(TYPE.MODEL.UPLOAD_STARTED)(modelId))
    try {
      await printingEngine.pollUploadStatus({modelId})
      dispatch(createAction(TYPE.MODEL.UPLOAD_FINISHED)())
    } catch (e) {
      dispatch(createAction(TYPE.MODEL.UPLOAD_ABORTED)())
    }
  }

  return {
    upload,
    modelUploaded
  }
}
