// @flow

import type {Dispatch} from 'redux'
import type {BackendModel, Action} from '../type-next'

let uploadCounter = -1

export const uploadModel = (
  file: File,
  params: {unit: string},
  dispatch: Dispatch<any>,
  onProgress: (process: number) => Action<any>
): Promise<BackendModel> => {
  uploadCounter++

  if (uploadCounter % 3 === 1) {
    setTimeout(() => dispatch(onProgress(0.4)), 0)
    return new Promise(() => {}) // This promise never resolves
  }

  if (uploadCounter % 3 === 2) {
    return Promise.reject(new Error('some-error-message'))
  }

  return Promise.resolve({
    modelId: `some-model-${uploadCounter}`,
    fileName: `some-file-name-${uploadCounter}`,
    dimensions: {
      x: 23.3,
      y: 42.2,
      z: 0.815
    },
    thumbnailUrl: 'http://placehold.it/130x98',
    fileUnit: 'mm',
    area: 42,
    volume: 23
  })
}
