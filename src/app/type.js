// @flow

export type Address = {
  firstName: string,
  lastName: string,
  street: string,
  houseNumber: string,
  addressLine2: string,
  city: string,
  zipCode: string,
  stateCode: string,
  countryCode: string
}

export type User = {
  currency: string,
  shippingAddress: Address,
  emailAddress: string,
  isCompany: boolean,
  companyName: ?string,
  vatId: string,
  phoneNumber: string,
  useDifferentBillingAddress: ?boolean,
  emailAddress: string,
  billingAddress: Address
}

export type Offer = {
  offerId: string,
  materialConfigId: string,
  printingService: string,
  subTotalPrice: number,
  vatPercentage: number,
  vatPrice: number,
  totalPrice: number,
  currency: string,
  priceEstimated: boolean,
  items: {
    modelId: string,
    price: number,
    quantity: number
  }[],
  shipping: {
    name: string,
    displayName: string,
    deliveryTime: string,
    price: number
  }[],
}

// @TODO: why is this object needed? What is this?
// It seems to be a mongo object from the backend
export type Price = {
  _id: string,
  offers: Offer[],
  printingServiceComplete: {
    shapeways: boolean,
    imaterialse: boolean,
    sculpteo: boolean
  }
}

export type ModelBackend = {
  modelId: string,
  fileName: string,
  fileUnit: 'mm' | 'cm' | 'in',
  area: number,
  volume: number,
  dimensions: {
    x: number,
    y: number,
    z: number
  },
  thumbnailUrl: string
}

export type ModelCompleted = ModelBackend & {
  // The folowing fields are differend from the backend:
  fileId: string,
  fileSize: number,
  quantity: number,
  // This are static for a completed upload
  progress: 1,
  uploadFinished: true,
}

type ModelUploading = {
  fileId: string,
  fileName: string,
  fileSize: number,
  progress: number,
  // This is static for an uncompleted upload
  uploadFinished: false
}

// @TODO: simplify this compex data model
export type Model = ModelCompleted | ModelUploading

export type File = {
  // This is the browsers native file object
  name: string,
  size: number
}

export type Configuration = {
  _id: string,
  materialConfigId: string,
  items: (ModelBackend & {  // @TODO: why is this unneded complicated?
    quantity: number
  })[]
}

//
// States

export type UserState = {
  userId: ?string,
  user: User
}

export type OrderState = {
  orderId: ?string,
  paymentToken: ?string,
  orderInProgress: boolean
}

export type ModelState = {
  numberOfUploads: number,
  selectedUnit: 'mm' | 'cm' | 'in',
  models: Model[]
}

export type PriceState = {
  priceId: ?string,
  offers: ?Offer[],
  printingServiceComplete: ?{
    shapeways: boolean,
    imaterialse: boolean,
    sculpteo: boolean
  },
  selectedOffer: ?Offer,
  error: ?any  // @TODO: unclear
}

export type ModalState = {
  isOpen: boolean,
  isCloseable: boolean,
  contentType: ?string,
  contentProps: ?any
}

export type ConfigurationState = {
  configurationId: ?string,
  isDirectSales: boolean
}

export type State = {
  user: UserState,
  order: OrderState,
  price: PriceState,
  material: any, // @TODO
  model: ModelState,
  modal: ModalState,
  configuration: ConfigurationState,
  routing: any,  // Managed by react-router-redux
  form: any  // Managed by redux-form
}
