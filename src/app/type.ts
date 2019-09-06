import {Actions} from './action'

export type Action<Type, Payload> = {type: Type; payload: Payload}

export type MaterialConfigId = string
export type FinishGroupId = string
export type MaterialGroupId = string
export type MaterialId = string
export type QuoteId = string
export type VendorId = string
export type ConfigId = string
export type ShippingId = string
export type ModelId = string
export type ModelSceneId = string
export type FileId = string
export type PriceId = string
export type CartId = string
export type ConfigurationId = string
export type OrderId = string
export type PaymentId = string
export type UserId = string
export type CartOfferId = string

// Material structure json-schema
// https://github.com/all3dp/material-structure/blob/master/src/schema.js

export type Notification = {
  message: string
  warning?: boolean
}

export type PrintingService = {
  [vendorId: string]: {
    materialId: MaterialId
    finishId: FinishGroupId
    printingMethodShort: string
    printingMethod: string
    materialName: string
    productionTimeFast: number
    productionTimeSlow: number
  }
}

export type MaterialConfig = {
  id: MaterialConfigId
  name: string
  color: string
  colorCode: string
  colorImage: string
  printingService: PrintingService
  finishGroupId: FinishGroupId
  materialId: MaterialId
  materialGroupId: MaterialGroupId
}

export type FinishGroup = {
  id: FinishGroupId
  name: string
  description: string
  descriptionShort: string
  materialGroupId: MaterialGroupId
  materialId: MaterialId
  materialName: string
  summary: string
  featuredImage: string
  properties: {
    printingServiceName: {
      [vendorId: string]: string
    }
    printingMethod: string
    printingMethodShort: string
    materialSpec: string
    strength: number
    flexibility: number
    levelOfDetail: number
    freedomOfDesign: number
    postProcessing: number
    fragile: boolean
    waterproof: boolean
    foodSafe: boolean
    dishwasherSafe: boolean
    paintable: boolean
    interlockingAndEnclosedParts: boolean
    uvResistant: boolean
    recyclable: boolean
  }
  materialConfigs: MaterialConfig[]
}

export type Material = {
  id: MaterialId
  name: string
  description: string
  descriptionShort: string
  materialGroupId: MaterialGroupId
  featuredImage: string
  finishGroups: FinishGroup[]
}

export type MaterialGroup = {
  id: MaterialGroupId
  name: string
  materials: Material[]
}

export type UploadingFile = {
  fileId: FileId
  fileName: string
  fileSize: number
  progress: number
  error: boolean
  errorMessage?: string
}

export type BackendModel = {
  modelId: ModelId
  fileName: string
  fileUnit: 'mm' | 'cm' | 'in'
  area?: number
  volume?: number
  dimensions?: {
    x: number
    y: number
    z: number
  }
  thumbnailUrl: string
  sceneId?: ModelSceneId
}

export type CartOffer = Cart & {
  shippings: Shipping[]
  quotes: Quote[]
  models: BackendModel[]
}

export type Quote = {
  quoteId: QuoteId
  vendorId: VendorId
  modelId: ModelId
  materialConfigId: MaterialConfigId
  price: number
  grossPrice: number
  quantity: number
  currency: string
  isPrintable: boolean
}

export type MultiModelQuote = {
  vendorId: VendorId
  materialConfigId: MaterialConfigId
  price: number
  grossPrice: number
  currency: string
  isPrintable: boolean
  quotes: Quote[]
}

export type Offer = {
  multiModelQuote: MultiModelQuote
  shipping: Shipping
  totalGrossPrice: number
}

export type Shipping = {
  shippingId: ShippingId
  vendorId: VendorId
  name: string
  deliveryTime: string
  price: number
  grossPrice: number
  currency: string
}

export type ModelConfigUploading = {
  type: 'UPLOADING'
  fileId: FileId
  id: ConfigId
}

export type ModelConfigUploaded = {
  type: 'UPLOADED'
  quantity: number
  modelId: ModelId
  id: ConfigId
  quoteId: QuoteId | null
  shippingId: ShippingId | null
}

export type ModelConfig = ModelConfigUploading | ModelConfigUploaded

export type Cart = {
  cartId: CartId
  shippingIds: ShippingId[]
  quoteIds: QuoteId[]
  subTotalPrice: number
  shippingTotal: number
  vatPercentage: number
  vatPrice: number
  totalPrice: number
  totalNetPrice: number
  currency: string
}

export type Location = {
  city: string
  zipCode: string
  stateCode: string
  countryCode: string
}

export type Address = Location & {
  firstName: string
  lastName: string
  address: string
  addressLine2?: string
}

export type GoogleMapsPlace = {
  address_components?: Array<{
    types: string[]
    short_name: string
    long_name: string
  }>
}

export type Features = {[key: string]: boolean}

export type UrlParams = {[key: string]: string}

export type UtmParams = {
  source: string
  medium: string
  campaign: string
  term: string
  content: string
}

export type User = {
  userId?: UserId
  emailAddress: string
  isCompany: boolean
  companyName?: string
  vatId?: string
  phoneNumber: string
  useDifferentBillingAddress: boolean
  shippingAddress: Address
  billingAddress: Address
  saveAddress?: boolean
  liableForVat: boolean
}

export enum ModalContentType {
  PICK_LOCATION = 'PICK_LOCATION',
  PICK_UNIT = 'PICK_UNIT',
  MODEL_VIEWER = 'MODEL_VIEWER',
  MATERIAL = 'MATERIAL',
  FINISH_GROUP = 'FINISH_GROUP',
  CONFIRM_LOCATION_CHANGE = 'CONFIRM_LOCATION_CHANGE',
  CONFIRM_CURRENCY_CHANGE = 'CONFIRM_CURRENCY_CHANGE',
  SHARE_CONFIGURATION = 'SHARE_CONFIGURATION',
  SHARE_CART = 'SHARE_CART',
  FATAL_ERROR = 'FATAL_ERROR',
  ERROR = 'ERROR',
  ADDRESS_FORM = 'ADDRESS_FORM',
  PROVIDER = 'PROVIDER'
}

export type ModalConfigClosed = null
export type ModalConfigOpened = {
  isCloseable: boolean
  contentType: ModalContentType
  contentProps: any
}
export type ModalConfig = ModalConfigOpened | ModalConfigClosed

export type TimeoutId = string
export type TimeoutCallId = string
export type TimeoutOnEndActionCreator = () => Actions

export enum PollingStatus {
  POLLING_CONTINUE = 'POLLING_CONTINUE',
  POLLING_DONE = 'POLLING_DONE'
}

export type PollingId = string
export type PollingArgs = any[]
export type PollingResult = {
  status: PollingStatus
  result: any
}
export type PollingFunction = (...args: PollingArgs) => PollingResult | Promise<PollingResult>
export type PollingOnSuccessActionCreator = (result: any) => Actions
export type PollingOnPartialResultActionCreator = (result: any) => Actions
export type PollingOnFailActionCreator = (error: Error) => Actions

export type ModelOnProgressActionCreator = (progress: number) => Actions

export type HttpUploadOptions = {
  url: string
  body: any
  headers?: Headers
  method?: string
  onProgress?: (progress: number) => void
}
export type HttpJsonResponse = {
  json: any
  http: Response
}

// export type AppAction = _AppAction
// export type AppState = _AppState
