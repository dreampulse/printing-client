import {handleActions} from 'redux-actions'

import TYPE from '../type'

export default function create () {
  const initialState = {
    isUploadFinished: false,
    modelId: null
  }

  function handleUploadStarted(state, {payload}) {
    return {
      ...state,
      modelId: payload
    }
  }

  function handleUploadFinished(state, {payload}) {
    return {
      ...state,
      isUploadFinished: true
    }
  }

  return handleActions({
    [TYPE.MODEL.UPLOAD_FINISHED]: handleUploadFinished,
    [TYPE.MODEL.UPLOAD_STARTED]: handleUploadStarted
  }, initialState)
}
