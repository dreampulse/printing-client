// @flow

import type {Action, ModalContentType, ModalConfigOpened, MaterialId} from '../type-next'

type OpenModalAction = Action<'MODAL.OPEN', ModalConfigOpened>
type CloseModalAction = Action<'MODAL.CLOSE', void>
export type ModalAction = OpenModalAction | CloseModalAction

export const CONTENT_TYPE: {[ModalContentType]: ModalContentType} = {
  PICK_LOCATION: 'PICK_LOCATION',
  MODEL_VIEWER: 'MODEL_VIEWER',
  MATERIAL: 'MATERIAL',
  FATAL_ERROR: 'FATAL_ERROR'
}

const open = (config: ModalConfigOpened): OpenModalAction => ({
  type: 'MODAL.OPEN',
  payload: config
})

export const openPickLocation = (): OpenModalAction =>
  open({
    isCloseable: false,
    contentType: CONTENT_TYPE.PICK_LOCATION,
    contentProps: null
  })

export const openModelViewer = (modelName: string): OpenModalAction =>
  open({
    isCloseable: true,
    contentType: CONTENT_TYPE.MODEL_VIEWER,
    contentProps: {
      modelName
    }
  })

export const openMaterial = (materialId: MaterialId) =>
  open({
    isCloseable: true,
    contentType: CONTENT_TYPE.MATERIAL,
    contentProps: {materialId}
  })

export const openShippingAddress = () =>
  open({
    isCloseable: false,
    contentType: CONTENT_TYPE.SHIPPING_ADDRESS,
    contentProps: null
  })

export const openFatalError = (error: Error): OpenModalAction =>
  open({
    isCloseable: false,
    contentType: CONTENT_TYPE.FATAL_ERROR,
    contentProps: {
      error
    }
  })

export const close = (): CloseModalAction => ({
  type: 'MODAL.CLOSE',
  payload: undefined
})
