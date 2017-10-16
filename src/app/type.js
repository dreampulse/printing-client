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

export type UserState = {
  userId: ?string,
  user: User
}

export type OrderState = {
  orderId: ?string,
  paymentToken: ?string,
  orderInProgress: boolean
}

export type State = {
  user: UserState,
  order: OrderState,
  price: any // TODO
}
