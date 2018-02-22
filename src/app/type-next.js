// @flow

import type {AppAction as _AppAction} from './action-next'
import type {AppState as _AppState} from './reducer'

export type MaterialConfigId = string
export type FinishGroupId = string
export type MaterialGroupId = string
export type MaterialId = string
export type PrintingServiceId = string
export type QuoteId = string
export type VendorId = string
export type ConfigId = string
export type ShippingId = string
export type ModelId = string
export type FileId = string

// Material structure json-schema
// https://github.com/all3dp/material-structure/blob/master/src/schema.js

export type MaterialConfig = {
  id: MaterialConfigId,
  name: string,
  color: string,
  colorCode: string,
  colorImage: string,
  printingService: any, // TODO
  finishGroupId: FinishGroupId,
  materialId: MaterialId,
  materialGroupId: MaterialGroupId
}

export type FinishGroup = {
  id: FinishGroupId,
  name: string,
  description: string,
  descriptionShort: string,
  materialGroupId: MaterialGroupId,
  materialId: MaterialId,
  materialName: string,
  summary: string,
  featuredImage: string,
  properties: {
    printingServiceName: {
      [PrintingServiceId]: string
    },
    printingMethod: string,
    printingMethodShort: string,
    materialSpec: string,
    strength: number,
    flexibility: number,
    levelOfDetail: number,
    freedomOfDesign: number,
    postProcessing: number,
    fragile: boolean,
    waterproof: boolean,
    foodSafe: boolean,
    dishwasherSafe: boolean,
    paintable: boolean,
    interlockingAndEnclosedParts: boolean,
    uvResistant: boolean,
    recyclable: boolean
  },
  materialConfigs: Array<MaterialConfig>
}

export type Material = {
  id: MaterialId,
  name: string,
  description: string,
  descriptionShort: string,
  materialGroupId: MaterialGroupId,
  featuredImage: string,
  finishGroups: Array<FinishGroup>
}

export type MaterialGroup = {
  id: MaterialGroupId,
  name: string,
  materials: Array<Material>
}

export type UploadingFile = {
  fileId: FileId,
  fileName: string,
  fileSize: number,
  progress: number,
  error: boolean,
  errorMessage?: string
}

export type BackendModel = {
  modelId: ModelId,
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

export type BackendQuote = {
  quoteId: QuoteId,
  vendorId: VendorId,
  modelId: ModelId,
  materialConfigId: MaterialConfigId,
  price: number,
  quantity: number,
  currency: string,
  isPrintable: boolean
}

export type ModelConfigUploading = {
  type: 'UPLOADING',
  fileId: FileId,
  id: ConfigId
}

export type ModelConfigUploaded = {
  type: 'UPLOADED',
  quantity: number,
  modelId: ModelId,
  id: ConfigId,
  quoteId: ?QuoteId,
  shippingId: ?ShippingId
}

export type ModelConfig = ModelConfigUploading | ModelConfigUploaded

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
