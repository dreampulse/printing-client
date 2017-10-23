// @flow

import type {
  Address,
  User,
  Offer,
  Price,
  ModelBackend,
  Configuration,
  Materials
} from './type'

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
    orderId: string,
  },
  error: ?boolean // @TODO: is this possible (we removed redux promise)
}

// Price actions

export type PriceOfferCleardAction = {
  type: 'PRICE.CLEAR_OFFERS', // @TODO rename
}

export type PriceRequestedAction = {
  type: 'PRICE.REQUESTED',
  payload: {
    priceId: string
  }
}

export type PriceReceivedAction = {
  type: 'PRICE.RECEIVED',
  payload: {
    price: Price,
    isComplete: boolean
  }
}

export type PriceTimedOutAction = {
  type: 'PRICE.TIMEOUT', // @TODO rename
}

export type PriceOfferSelectedAction = {
  type: 'PRICE.SELECT_OFFER', // @TODO rename
  payload: {
    offer: ?Offer
  }
}

export type PriceGotErrorAction = {
  type: 'PRICE.GOT_ERROR',
  payload: Error
}

// Model actions

export type ModelQuantityChangedAction = {
  type: 'MODEL.QUANTITIY_CHANGED',
  payload: {
    quantity: number
  }
}

export type ModelIndividualQuantityChangedAction = {
  type: 'MODEL.INDIVIDUAL_QUANTITIY_CHANGED',
  payload: {
    modelId: string,
    quantity: number
  }
}

export type ModelFileUploadStartedAction = {
  type: 'MODEL.FILE_UPLOAD_STARTED',
  payload: {
    fileId: string,
    fileName: string,
    fileSize: number
  }
}

export type ModelFileUploadProgressedAction = {
  type: 'MODEL.FILE_UPLOAD_PROGRESSED',
  payload: {
    fileId: string,
    progress: number
  }
}

export type ModelFileUploadFailedAction = {
  type: 'MODEL.FILE_UPLOAD_FAILED',
  payload: {
    fileId: string,
    error: Error
  }
}

export type ModelFileUploadedAction = {
  type: 'MODEL.FILE_UPLOADED',
  payload: ModelBackend & { // @TODO: improve payload datastructure
    fileId: number
  }
}

export type ModelFileDeletedAction = {
  type: 'MODEL.FILE_DELETED',
  payload: {
    fileId: string
  }
}

export type ModelUnitChangedAction = {
  type: 'MODEL.UNIT_CHANGED',
  payload: {
    unit: 'mm' | 'cm' | 'in'
  }
}

//
// Modal actions

export type ModalOpenedAction = {
  type: 'MODAL.OPEN', // @TODO: past!
  payload: {
    contentType: string,
    contentProps: any,
    isCloseable: boolean
  }
}

export type ModalClosedAction = {
  type: 'MODAL.CLOSE' // @TODO: past!
}

//
// Configuration actions

// @TODO: rename -> direct_sales -> Configuration
export type ConfigurationRestoredAction = {
  type: 'DIRECT_SALES.RESTORE_CONFIGURATION', // @TODO: rename
  payload: Configuration
}

export type ConfigurationCreatedAction = {
  type: 'DIRECT_SALES.CREATE_CONFIGURATION', // @TODO: rename
  payload: Configuration
}

//
// Materials actions
export type MaterialSelectedAction = {
  type: 'MATERIAL.SELECTED',
  payload: string // This (in the frontend generated) materialId
}

export type MaterialConfigForFinishGroupSelectedAction = {
  type: 'MATERIAL.CONFIG_FOR_FINISH_GROUP_SELECTED',
  payload: {[finishGroupId: string]: string} // @TODO: why so strage?
}

export type MaterialConfigSelectedAction = {
  type: 'MATERIAL.CONFIG_SELECTED',
  payload: string // This is the materialId
}

export type MaterialReceivedAction = {
  type: 'MATERIAL.RECEIVED',
  payload: Materials
}

//
// All actions combined
export type Action =
  UserShippingAddressChangedAction |
  UserCreatedAction |
  UserUpdatedAction |
  OrderStartedAction |
  OrderPayedAction |
  OrderAbortedAction |
  OrderOrderedAction |
  PriceOfferCleardAction |
  PriceRequestedAction |
  PriceReceivedAction |
  PriceTimedOutAction |
  PriceOfferSelectedAction |
  PriceGotErrorAction |
  ModelQuantityChangedAction |
  ModelIndividualQuantityChangedAction |
  ModelFileUploadStartedAction |
  ModelFileUploadProgressedAction |
  ModelFileUploadFailedAction |
  ModelFileUploadedAction |
  ModelFileDeletedAction |
  ModelUnitChangedAction |
  ModalOpenedAction |
  ModalClosedAction |
  ConfigurationRestoredAction |
  ConfigurationCreatedAction |
  MaterialSelectedAction |
  MaterialConfigForFinishGroupSelectedAction |
  MaterialConfigSelectedAction |
  MaterialConfigSelectedAction |
  MaterialReceivedAction

export default {
  MODAL: {
    OPEN: 'MODAL.OPEN',
    CLOSE: 'MODAL.CLOSE'
  },
  MODEL: {
    FILE_UPLOAD_PROGRESSED: 'MODEL.FILE_UPLOAD_PROGRESSED',
    FILE_UPLOAD_STARTED: 'MODEL.FILE_UPLOAD_STARTED',
    FILE_UPLOAD_FAILED: 'MODEL.FILE_UPLOAD_FAILED',
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
    TIMEOUT: 'PRICE.TIMEOUT',
    GOT_ERROR: 'PRICE.GOT_ERROR'
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
