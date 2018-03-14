// @flow

import type {AppState, ModelSceneId} from '../type-next'

export const isModelViewerOpen = (state: AppState): boolean => state.modelViewer !== null
export const selectSceneId = (state: AppState): ModelSceneId | null =>
  state.modelViewer === null ? null : state.modelViewer.sceneId
