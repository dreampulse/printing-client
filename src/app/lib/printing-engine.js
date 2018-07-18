// @flow

import type {Dispatch} from 'redux'

import config from '../../../config'
import type {ModelId, BackendModel, ModelOnProgressActionCreator, AppAction} from '../type-next'
import * as httpJson from './http-json'

const baseUrl = config.printingEngineBaseUrl

export const fetchMaterialGroups = async () => {
  const response = await httpJson.fetch(`${baseUrl}/v2/material`)

  return response.json
}

export const uploadModel = async (
  file: File,
  meta: {
    unit: string
  },
  dispatch: Dispatch<AppAction>,
  onProgressActionCreator: ModelOnProgressActionCreator
): Promise<BackendModel> => {
  const response = await httpJson.upload({
    method: 'POST',
    url: `${baseUrl}/v2/model`,
    body: {
      file,
      unit: meta.unit
    },
    onProgress: progress => {
      dispatch(onProgressActionCreator(progress))
    }
  })

  return response.json
}

export const getModelWithStatus = async (
  modelId: ModelId
): Promise<{
  model: BackendModel,
  isComplete: boolean
}> => {
  const response = await httpJson.fetch(`${baseUrl}/v2/model/${modelId}`)

  return {
    model: response.json,
    isComplete: response.http.status === 200
  }
}
