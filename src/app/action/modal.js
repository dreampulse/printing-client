// @flow

import type {
  Action,
  ModalContentType,
  ModalConfigOpened,
  MaterialId,
  FinishGroupId,
  Location,
  ConfigurationId
} from '../type'

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
  SHARE_CONFIGURATION: 'SHARE_CONFIGURATION',
  FATAL_ERROR: 'FATAL_ERROR'
}

const open = (config: ModalConfigOpened): OpenModalAction => ({
  type: 'MODAL.OPEN',
  payload: config
})

export const openPickLocationModal = ({confirmation}: {confirmation: boolean}): OpenModalAction =>
  open({
    isCloseable: confirmation,
    contentType: CONTENT_TYPE.PICK_LOCATION,
    contentProps: {
      confirmation
    }
  })

export const openPickUnitModal = (files: FileList): OpenModalAction =>
  open({
    isCloseable: false,
    contentType: CONTENT_TYPE.PICK_UNIT,
    contentProps: {
      files
    }
  })

export const openModelViewerModal = (modelName: string): OpenModalAction =>
  open({
    isCloseable: true,
    contentType: CONTENT_TYPE.MODEL_VIEWER,
    contentProps: {
      modelName
    }
  })

export const openMaterialModal = (materialId: MaterialId) =>
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

export const openConfirmLocationChangeModal = ({
  location,
  previousLocation
}: {
  location: Location,
  previousLocation: Location
}) =>
  open({
    isCloseable: true,
    contentType: CONTENT_TYPE.CONFIRM_LOCATION_CHANGE,
    contentProps: {location, previousLocation}
  })

export const openConfirmCurrencyChangeModal = (currency: string) =>
  open({
    isCloseable: true,
    contentType: CONTENT_TYPE.CONFIRM_CURRENCY_CHANGE,
    contentProps: {currency}
  })

export const openShareConfigurationModal = (configurationId: ConfigurationId) =>
  open({
    isCloseable: true,
    contentType: CONTENT_TYPE.SHARE_CONFIGURATION,
    contentProps: {configurationId}
  })

export const openFatalErrorModal = (error: Error): OpenModalAction =>
  open({
    isCloseable: false,
    contentType: CONTENT_TYPE.FATAL_ERROR,
    contentProps: {
      error
    }
  })

export const closeModal = (): CloseModalAction => ({
  type: 'MODAL.CLOSE',
  payload: undefined
})
