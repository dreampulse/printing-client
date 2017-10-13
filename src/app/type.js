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

export type State = {
  user: UserState,
  price: any // TODO
}

// Action Types

export type UserShippingAddressChangedAction = {
  type: 'USER.SHIPPING_ADDRESS_CHANGED',
  payload: {
    address: Address
  }
}

export type UserCreatedAction = {
  type: 'USER.CREATED',
  payload: {
    userId: string
  }
}

export type UserUpdatedAction = {
  type: 'USER.UPDATED',
  payload: User
}

export type Action =
  UserShippingAddressChangedAction |
  UserCreatedAction |
  UserUpdatedAction
