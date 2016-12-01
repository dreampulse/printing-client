import {createAction} from 'redux-actions';

import TYPE from '../../../src/app/type';

export default ({api}) => {
  const upload = (form, onProgressChange) => dispatch => {
    return api.printingEngine.uploadModel(form, onProgressChange)
  }

  const modelUploaded = ({modelId}) => async dispatch => {
    dispatch(createAction(TYPE.MODEL.UPLOAD_STARTED)(modelId))

    const pollStatus = async (retries) => {
      const isFinished = await api.printingEngine.getUploadStatus({modelId})
      if (isFinished) dispatch(createAction(TYPE.MODEL.UPLOAD_FINISHED)())
      else if (retries > 0) setTimeout(pollStatus.bind(null, retries - 1), 1000)
      else dispatch(createAction(TYPE.MODEL.UPLOAD_ABORTED)())
    }

    pollStatus(100)
  }

  return {
    upload,
    modelUploaded
  }
}
