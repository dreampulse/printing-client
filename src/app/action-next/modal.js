// @flow

import type {
  Action,
  ModalContentType,
  ModalConfigOpened,
  MaterialId,
  FinishGroupId,
  Location
} from '../type-next'

type OpenModalAction = Action<'MODAL.OPEN', ModalConfigOpened>
type CloseModalAction = Action<'MODAL.CLOSE', void>
export type ModalAction = OpenModalAction | CloseModalAction

export const CONTENT_TYPE: {[ModalContentType]: ModalContentType} = {
  PICK_LOCATION: 'PICK_LOCATION',
  PICK_UNIT: 'PICK_UNIT',
  MODEL_VIEWER: 'MODEL_VIEWER',
  MATERIAL: 'MATERIAL',
  FINISH_GROUP: 'FINISH_GROUP',
  CONFIRM_LOCATION_CHANGE: 'CONFIRM_LOCATION_CHANGE',
  CONFIRM_CURRENCY_CHANGE: 'CONFIRM_CURRENCY_CHANGE',
  FATAL_ERROR: 'FATAL_ERROR'
}

const open = (config: ModalConfigOpened): OpenModalAction => ({
  type: 'MODAL.OPEN',
  payload: config
})

export const openPickLocation = (
  isCloseable: boolean = false,
  showWarning: boolean = false
): OpenModalAction =>
  open({
    isCloseable,
    showWarning,
    contentType: CONTENT_TYPE.PICK_LOCATION,
    contentProps: null
  })

export const openPickUnit = (files: FileList): OpenModalAction =>
  open({
    isCloseable: false,
    contentType: CONTENT_TYPE.PICK_UNIT,
    contentProps: {
      files
    }
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

export const openFinishGroupModal = (finishGroupId: FinishGroupId) =>
  open({
    isCloseable: true,
    contentType: CONTENT_TYPE.FINISH_GROUP,
    contentProps: {finishGroupId}
  })

export const openConfirmLocationChange = (location: Location) =>
  open({
    isCloseable: true,
    contentType: CONTENT_TYPE.CONFIRM_LOCATION_CHANGE,
    contentProps: {location}
  })

export const openConfirmCurrencyChange = (currency: string) =>
  open({
    isCloseable: true,
    contentType: CONTENT_TYPE.CONFIRM_CURRENCY_CHANGE,
    contentProps: {currency}
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
