// @flow

import type {Address, User} from './type'

// User actions

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

// Order actions

export type OrderStartedAction = {
  type: 'ORDER.STARTED'
}

export type OrderPayedAction = {
  type: 'ORDER.PAYED',
  payload: {
    paymentToken: string
  }
}

export type OrderAbortedAction = {
  type: 'ORDER.ABORTED'
}

export type OrderOrderedAction = {
  type: 'ORDER.ORDERED',
  payload: {
    orderId: string
  },
  error: ?boolean
}

// All actions combined
export type Action =
  UserShippingAddressChangedAction |
  UserCreatedAction |
  UserUpdatedAction |
  OrderStartedAction |
  OrderPayedAction |
  OrderAbortedAction |
  OrderOrderedAction

export default {
  MODAL: {
    OPEN: 'MODAL.OPEN',
    CLOSE: 'MODAL.CLOSE'
  },
  MODEL: {
    FILE_UPLOAD_PROGRESSED: 'MODEL.FILE_UPLOAD_PROGRESSED',
    FILE_UPLOAD_STARTED: 'MODEL.FILE_UPLOAD_STARTED',
    FILE_UPLOADED: 'MODEL.FILE_UPLOADED',
    FILE_DELETED: 'MODEL.FILE_DELETED',
    QUANTITIY_CHANGED: 'MODEL.QUANTITIY_CHANGED',
    INDIVIDUAL_QUANTITIY_CHANGED: 'MODEL.INDIVIDUAL_QUANTITIY_CHANGED',
    UNIT_CHANGED: 'MODEL.UNIT_CHANGED'
  },
  MATERIAL: {
    RECEIVED: 'MATERIAL.RECEIVED',
    SELECTED: 'MATERIAL.SELECTED',
    CONFIG_SELECTED: 'MATERIAL.CONFIG_SELECTED',
    CONFIG_FOR_FINISH_GROUP_SELECTED: 'MATERIAL.CONFIG_FOR_FINISH_GROUP_SELECTED'
  },
  PRICE: {
    SELECT_OFFER: 'PRICE.SELECT_OFFER',
    CLEAR_OFFERS: 'PRICE.CLEAR_OFFERS',
    REQUESTED: 'PRICE.REQUESTED',
    RECEIVED: 'PRICE.RECEIVED',
    TIMEOUT: 'PRICE.TIMEOUT'
  },
  USER: {
    SHIPPING_ADDRESS_CHANGED: 'USER.SHIPPING_ADDRESS_CHANGED',
    CREATED: 'USER.CREATED',
    UPDATED: 'USER.UPDATED',
    SET_BILLING_ADDRESS: 'USER.SET_BILLING_ADDRESS'
  },
  ORDER: {
    ORDERED: 'ORDER.ORDERED',
    PAYED: 'ORDER.PAYED',
    STARTED: 'ORDER.STARTED',
    ABORTED: 'ORDER.ABORTED'
  },
  DIRECT_SALES: {
    RESTORE_CONFIGURATION: 'DIRECT_SALES.RESTORE_CONFIGURATION',
    CREATE_CONFIGURATION: 'DIRECT_SALES.CREATE_CONFIGURATION'
  }
}

export const MODAL_TYPE = {
  SHIPPING_ADDRESS: 'MODAL.SHIPPING_ADDRESS',
  FETCHING_PRICE: 'MODAL.FETCHING_PRICE',
  PRICE_CHANGED: 'MODAL.PRICE_CHANGED',
  PRICE_LOCATION_CHANGED: 'MODAL.PRICE_LOCATION_CHANGED',
  MATERIAL: 'MODAL.MATERIAL',
  FATAL_ERROR: 'MODAL.FATAL_ERROR'
}

export const ERROR_TYPE = {
  POLL_TIMEOUT: 'POLL_TIMEOUT',
  POLL_STOPPED: 'POLL_STOPPED',
  POLL_OVERWRITTEN: 'POLL_OVERWRITTEN',
  FILE_UPLOAD_FAILED: 'FILE_UPLOAD_FAILED'
}
