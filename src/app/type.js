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
  }
}

// @TODO: why is this object needed? What is this?
// It seems to be a mongo object from the backend
export type Price = {
  _id: string,
  offers: Array<Offer>,
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
  area: ?number,
  volume: ?number,
  dimensions: {
    x: ?number,
    y: ?number,
    z: ?number
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
  uploadFinished: true
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
  items: Array<
    ModelBackend & {
      // @TODO: why is this response different from the rest?
      quantity: number
    }
  >
}

export type Materials = {
  materialStructure: Array<{
    id: string, // Generated by the frontend
    name: string,
    materials: Array<{
      id: string, // Generated by the frontend
      name: string,
      description: string,
      properties: {
        dishwasherSafe: boolean,
        flexibility: number,
        foodSafe: boolean,
        freedomOfDesign: number,
        interlockingAndEnclosedParts: boolean,
        levelOfDetail: number,
        materialSpec: string,
        postProcessing: number,
        printingMethod: string,
        recyclable: boolean,
        waterproof: boolean
      },
      finishGroups: Array<{
        id: string, // Generated by the frontend
        name: string,
        materialName: string,
        summary: string,
        featuredImage: string,
        materialConfigs: Array<{
          id: string,
          name: string,
          color: string,
          colorCode: string,
          colorImage: string
        }>
      }>
    }>
  }>,
  materialConfigs: any // This is not needed for the frontend
}

//
// Feature-Flags

export type Features = {
  share?: true,
  refresh?: true,
  invoice?: true
}

//
// States

export type UserState = {
  userId: ?string,
  user: User
}

export type OrderState = {
  orderId: ?string,
  orderNumber: ?string,
  paymentToken: ?string,
  orderInProgress: boolean
}

export type ModelState = {
  numberOfUploads: number,
  selectedUnit: 'mm' | 'cm' | 'in',
  models: Array<Model>
}

export type PriceState = {
  priceId: ?string,
  offers: ?Array<Offer>,
  printingServiceComplete: ?{
    shapeways: boolean,
    imaterialse: boolean,
    sculpteo: boolean
  },
  selectedOffer: ?Offer
}

export type ModalStateContentType =
  | 'MODAL.SHIPPING_ADDRESS'
  | 'MODAL.FETCHING_PRICE'
  | 'MODAL.PRICE_CHANGED'
  | 'MODAL.PRICE_LOCATION_CHANGED'
  | 'MODAL.MATERIAL'
  | 'MODAL.FATAL_ERROR'
  | null

export type ModalState = {
  isOpen: boolean,
  isCloseable: boolean,
  contentType: ModalStateContentType,
  contentProps: ?any
}

export type ConfigurationState = {
  configurationId: ?string,
  isDirectSales: boolean
}

export type MaterialState = {
  materials: ?Materials,
  // This value reflects the material selection from the material dropdown
  selectedMaterial?: string,
  // This value reflects the actual user selection after the user
  // clicked the 'Select' button on a material card
  selectedMaterialConfig?: string,
  // This object stores the current color selection for each material card.
  // It does not reflect the final user selection.
  selectedMaterialConfigs?: any
}

export type State = {
  user: UserState,
  order: OrderState,
  price: PriceState,
  material: MaterialState,
  model: ModelState,
  modal: ModalState,
  configuration: ConfigurationState
}
