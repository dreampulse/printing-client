// @flow

import type {AppAction as _AppAction} from './action-next'
import type {AppState as _AppState} from './reducer'

export type MaterialConfig = {
  id: string,
  name: string,
  color: string,
  colorCode: string,
  colorImage: string
}

export type FinishGroup = {
  id: string,
  name: string,
  description: string,
  descriptionShort: string,
  materialGroupId: string,
  materialId: string,
  materialName: string,
  summary: string,
  featuredImage: string,
  properties: {
    flexibility: number,
    freedomOfDesign: number,
    interlockingAndEnclosedParts: boolean,
    levelOfDetail: number,
    printingMethod: string,
    printingMethodShort: string,
    printingServiceName: {
      [string]: string
    },
    strength: number
  },
  materialConfigs: Array<MaterialConfig>
}

export type Material = {
  id: string,
  name: string,
  description: string,
  descriptionShort: string,
  materialGroupId: string,
  featuredImage: string,
  finishGroups: Array<FinishGroup>
}

export type MaterialGroup = {
  id: string,
  name: string,
  materials: Array<{
    id: string,
    name: string,
    description: string,
    descriptionShort: string,
    materialGroupId: string,
    featuredImage: string,
    finishGroups: Array<FinishGroup>
  }>
}

export type UploadingFile = {
  fileId: string,
  fileName: string,
  fileSize: number,
  progress: number,
  error: boolean,
  errorMessage?: string
}

export type Model = {
  modelId: string,
  fileName: string,
  fileUnit: 'mm' | 'cm' | 'in',
  area: ?number,
  volume: ?number,
  dimensions: {
    x: ?number,
    y: ?number,
    z: ?number
  },
  thumbnailUrl: string
}

export type BasketItem = {
  quantity: number,
  modelId: string,
  material: any // @TODO: This is the configuration
}

export type Location = {
  city: string,
  zipCode: string,
  stateCode: string,
  countryCode: string
}

export type Address = Location & {
  firstName: string,
  lastName: string,
  address: string,
  addressLine2: string
}

export type GoogleMapsPlace = {
  address_components: ?Array<{
    types: Array<string>,
    short_name: string,
    long_name: string
  }>
}

export type ModalContent = 'PICK_LOCATION' | 'FATAL_ERROR'

type _ModalConfig<C> = {
  isCloseable: boolean,
  content: C,
  contentProps: any
}

export type ModalConfig = _ModalConfig<null | ModalContent>

export type OpenModalConfig = _ModalConfig<ModalContent>

export type Action<Type, Payload> = {
  type: Type,
  payload: Payload
}

export type AppAction = _AppAction

export type AppState = _AppState
