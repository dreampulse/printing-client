import {bindActionCreators} from 'redux'

import uniqueId from 'lodash/uniqueId'

import * as actionCreator from '../action-creator'
import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'

export const checkUploadStatus = ({modelId, fileId}) => async (dispatch) => {
  const {
    modelCheckStatusStarted,
    modelCheckStatusFinished,
    modelCheckStatusFailed
  } = bindActionCreators(actionCreator, dispatch)

  modelCheckStatusStarted({fileId})
  try {
    await pollApi(() => printingEngine.getUploadStatus({modelId}))
    modelCheckStatusFinished({fileId})
  } catch (e) {
    modelCheckStatusFailed({fileId})
  }
}

export const uploadFile = file => async (dispatch, getState) => {
  const {
    modelUploadToBackendStarted,
    modelUploadToBackendProgressed,
    modelUploadToBackendFinished,
    modelUploadToBackendFailed
  } = bindActionCreators(actionCreator, dispatch)

  const fileId = uniqueId('file-id-')
  const unit = getState().model.selectedUnit

  modelUploadToBackendStarted({
    fileId,
    name: file.name,
    size: file.size
  })

  try {
    const {modelId} = await printingEngine.uploadModel(file, (progress) => {
      modelUploadToBackendProgressed({
        fileId,
        progress
      })
    }, {
      unit
    })

    modelUploadToBackendFinished({fileId, modelId})
    return {modelId, fileId}
  } catch (error) {
    modelUploadToBackendFailed({fileId, error})
    throw error
  }
}

export const uploadFiles = files => async (dispatch) => {
  await Promise.all(files.map(async (file) => {
    try {
      const {modelId, fileId} = await dispatch(uploadFile(file))
      return dispatch(checkUploadStatus({modelId, fileId}))
    } catch (e) {
      return Promise.reject()
    }
  }))
}
