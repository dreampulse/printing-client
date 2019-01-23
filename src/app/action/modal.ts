import {
  Action,
  ModalConfigOpened,
  MaterialId,
  FinishGroupId,
  Location,
  ModalContentType,
  ConfigurationId
} from '../type'

export type OpenModalAction = Action<'MODAL.OPEN', ModalConfigOpened>
export type CloseModalAction = Action<'MODAL.CLOSE', void>
export type ModalAction = OpenModalAction | CloseModalAction

const open = (config: ModalConfigOpened): OpenModalAction => ({
  type: 'MODAL.OPEN',
  payload: config
})

export const openPickLocationModal = ({confirmation}: {confirmation: boolean}): OpenModalAction =>
  open({
    isCloseable: confirmation,
    contentType: ModalContentType.PICK_LOCATION,
    contentProps: {
      confirmation
    }
  })

export const openPickUnitModal = (files: FileList): OpenModalAction =>
  open({
    isCloseable: false,
    contentType: ModalContentType.PICK_UNIT,
    contentProps: {
      files
    }
  })

export const openModelViewerModal = (modelName: string): OpenModalAction =>
  open({
    isCloseable: true,
    contentType: ModalContentType.MODEL_VIEWER,
    contentProps: {
      modelName
    }
  })

export const openMaterialModal = (materialId: MaterialId) =>
  open({
    isCloseable: true,
    contentType: ModalContentType.MATERIAL,
    contentProps: {materialId}
  })

export const openFinishGroupModal = (finishGroupId: FinishGroupId) =>
  open({
    isCloseable: true,
    contentType: ModalContentType.FINISH_GROUP,
    contentProps: {finishGroupId}
  })

export const openConfirmLocationChangeModal = ({
  location,
  previousLocation
}: {
  location: Location
  previousLocation: Location
}) =>
  open({
    isCloseable: true,
    contentType: ModalContentType.CONFIRM_LOCATION_CHANGE,
    contentProps: {location, previousLocation}
  })

export const openConfirmCurrencyChangeModal = (currency: string) =>
  open({
    isCloseable: true,
    contentType: ModalContentType.CONFIRM_CURRENCY_CHANGE,
    contentProps: {currency}
  })

export const openShareConfigurationModal = (configurationId: ConfigurationId) =>
  open({
    isCloseable: true,
    contentType: ModalContentType.SHARE_CONFIGURATION,
    contentProps: {configurationId}
  })

export const openFatalErrorModal = (error: Error): OpenModalAction =>
  open({
    isCloseable: false,
    contentType: ModalContentType.FATAL_ERROR,
    contentProps: {
      error
    }
  })

export const openErrorModal = (error: Error): OpenModalAction =>
  open({
    isCloseable: true,
    contentType: ModalContentType.ERROR,
    contentProps: {
      error
    }
  })

export const openAddressFormModal = (): OpenModalAction =>
  open({
    isCloseable: true,
    contentType: ModalContentType.ADDRESS_FORM,
    contentProps: {}
  })

export const closeModal = (): CloseModalAction => ({
  type: 'MODAL.CLOSE',
  payload: undefined
})
