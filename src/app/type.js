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

export type UserState = {
  userId: ?string,
  user: User
}

export type OrderState = {
  orderId: ?string,
  paymentToken: ?string,
  orderInProgress: boolean
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

export type State = {
  user: UserState,
  order: OrderState,
  price: PriceState,
  material: any, // @TODO
  model: any // @TODO
}
