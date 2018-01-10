// @flow

import type {UtmParams} from './lib/search-params'
import type {
  Address,
  User,
  Offer,
  Price,
  ModelBackend,
  Configuration,
  Materials,
  ModalStateContentType
} from './type'

// User actions

export type UserShippingAddressChangedAction = {
  type: 'LEGACY.USER.SHIPPING_ADDRESS_CHANGED',
  payload: {
    address: Address
  }
}

export type UserCreatedAction = {
  type: 'LEGACY.USER.CREATED',
  payload: {
    userId: string
  }
}

export type UserUpdatedAction = {
  type: 'LEGACY.USER.UPDATED',
  payload: User
}

export type UserUtmParamsSetAction = {
  type: 'LEGACY.USER.UTM_PARAMS_SET',
  payload: UtmParams
}

export type UserCurrencyChangedAction = {
  type: 'LEGACY.USER.CURRENCY_CHANGED',
  payload: string
}

// Order actions

export type OrderStartedAction = {
  type: 'LEGACY.ORDER.STARTED'
}

export type OrderPayedAction = {
  type: 'LEGACY.ORDER.PAYED',
  payload: {
    paymentToken: string
  }
}

export type OrderAbortedAction = {
  type: 'LEGACY.ORDER.ABORTED'
}

export type OrderOrderedAction = {
  type: 'LEGACY.ORDER.ORDERED',
  payload: {
    orderId: string,
    orderNumber: string
  }
}

// Price actions

export type PriceOfferCleardAction = {
  type: 'LEGACY.PRICE.CLEAR_OFFERS' // @TODO rename
}

export type PriceRequestedAction = {
  type: 'LEGACY.PRICE.REQUESTED',
  payload: {
    priceId: string
  }
}

export type PriceReceivedAction = {
  type: 'LEGACY.PRICE.RECEIVED',
  payload: {
    price: Price,
    isComplete: boolean
  }
}

export type PriceTimedOutAction = {
  type: 'LEGACY.PRICE.TIMEOUT' // @TODO rename
}

export type PriceOfferSelectedAction = {
  type: 'LEGACY.PRICE.SELECT_OFFER', // @TODO rename
  payload: {
    offer: ?Offer
  }
}

// Model actions

export type ModelQuantityChangedAction = {
  type: 'LEGACY.MODEL.QUANTITIY_CHANGED',
  payload: {
    quantity: number
  }
}

export type ModelIndividualQuantityChangedAction = {
  type: 'LEGACY.MODEL.INDIVIDUAL_QUANTITIY_CHANGED',
  payload: {
    modelId: string,
    quantity: number
  }
}

export type ModelFileUploadStartedAction = {
  type: 'LEGACY.MODEL.FILE_UPLOAD_STARTED',
  payload: {
    fileId: string,
    fileName: string,
    fileSize: number
  }
}

export type ModelFileUploadProgressedAction = {
  type: 'LEGACY.MODEL.FILE_UPLOAD_PROGRESSED',
  payload: {
    fileId: string,
    progress: number
  }
}

export type ModelFileUploadFailedAction = {
  type: 'LEGACY.MODEL.FILE_UPLOAD_FAILED',
  payload: {
    fileId: string,
    error: Error
  }
}

export type ModelFileUploadedAction = {
  type: 'LEGACY.MODEL.FILE_UPLOADED',
  payload: ModelBackend & {
    // @TODO: improve payload datastructure
    fileId: number
  }
}

export type ModelFileDeletedAction = {
  type: 'LEGACY.MODEL.FILE_DELETED',
  payload: {
    fileId: string
  }
}

export type ModelUnitChangedAction = {
  type: 'LEGACY.MODEL.UNIT_CHANGED',
  payload: {
    unit: 'mm' | 'cm' | 'in'
  }
}

//
// Modal actions

export type ModalOpenedAction = {
  type: 'LEGACY.MODAL.OPEN', // @TODO: past!
  payload: {
    contentType: ModalStateContentType,
    contentProps: any,
    isCloseable: boolean
  }
}

export type ModalClosedAction = {
  type: 'LEGACY.MODAL.CLOSE' // @TODO: past!
}

//
// Configuration actions

// @TODO: rename -> direct_sales -> Configuration
export type ConfigurationRestoredAction = {
  type: 'LEGACY.DIRECT_SALES.RESTORE_CONFIGURATION', // @TODO: rename
  payload: Configuration
}

export type ConfigurationCreatedAction = {
  type: 'LEGACY.DIRECT_SALES.CREATE_CONFIGURATION', // @TODO: rename
  payload: Configuration
}

//
// Materials actions
export type MaterialSelectedAction = {
  type: 'LEGACY.MATERIAL.SELECTED',
  payload: string // This (in the frontend generated) materialId
}

export type MaterialGroupSelectedAction = {
  type: 'LEGACY.MATERIAL.GROUP_SELECTED',
  payload: string
}

export type MaterialConfigForFinishGroupSelectedAction = {
  type: 'LEGACY.MATERIAL.CONFIG_FOR_FINISH_GROUP_SELECTED',
  payload: {[finishGroupId: string]: string} // @TODO: why so strage?
}

export type MaterialConfigSelectedAction = {
  type: 'LEGACY.MATERIAL.CONFIG_SELECTED',
  payload: string // This is the materialId
}

export type MaterialReceivedAction = {
  type: 'LEGACY.MATERIAL.RECEIVED',
  payload: Materials
}

//
// All actions combined
export type Action =
  | UserShippingAddressChangedAction
  | UserCreatedAction
  | UserUpdatedAction
  | UserCurrencyChangedAction
  | UserUtmParamsSetAction
  | OrderStartedAction
  | OrderPayedAction
  | OrderAbortedAction
  | OrderOrderedAction
  | PriceOfferCleardAction
  | PriceRequestedAction
  | PriceReceivedAction
  | PriceTimedOutAction
  | PriceOfferSelectedAction
  | ModelQuantityChangedAction
  | ModelIndividualQuantityChangedAction
  | ModelFileUploadStartedAction
  | ModelFileUploadProgressedAction
  | ModelFileUploadFailedAction
  | ModelFileUploadedAction
  | ModelFileDeletedAction
  | ModelUnitChangedAction
  | ModalOpenedAction
  | ModalClosedAction
  | ConfigurationRestoredAction
  | ConfigurationCreatedAction
  | MaterialSelectedAction
  | MaterialGroupSelectedAction
  | MaterialConfigForFinishGroupSelectedAction
  | MaterialConfigSelectedAction
  | MaterialReceivedAction

export default {
  MODAL: {
    OPEN: 'LEGACY.MODAL.OPEN',
    CLOSE: 'LEGACY.MODAL.CLOSE'
  },
  MODEL: {
    FILE_UPLOAD_PROGRESSED: 'LEGACY.MODEL.FILE_UPLOAD_PROGRESSED',
    FILE_UPLOAD_STARTED: 'LEGACY.MODEL.FILE_UPLOAD_STARTED',
    FILE_UPLOAD_FAILED: 'LEGACY.MODEL.FILE_UPLOAD_FAILED',
    FILE_UPLOADED: 'LEGACY.MODEL.FILE_UPLOADED',
    FILE_DELETED: 'LEGACY.MODEL.FILE_DELETED',
    QUANTITIY_CHANGED: 'LEGACY.MODEL.QUANTITIY_CHANGED',
    INDIVIDUAL_QUANTITIY_CHANGED: 'LEGACY.MODEL.INDIVIDUAL_QUANTITIY_CHANGED',
    UNIT_CHANGED: 'LEGACY.MODEL.UNIT_CHANGED'
  },
  MATERIAL: {
    RECEIVED: 'LEGACY.MATERIAL.RECEIVED',
    SELECTED: 'LEGACY.MATERIAL.SELECTED',
    GROUP_SELECTED: 'LEGACY.MATERIAL.GROUP_SELECTED',
    CONFIG_SELECTED: 'LEGACY.MATERIAL.CONFIG_SELECTED',
    CONFIG_FOR_FINISH_GROUP_SELECTED: 'LEGACY.MATERIAL.CONFIG_FOR_FINISH_GROUP_SELECTED'
  },
  PRICE: {
    SELECT_OFFER: 'LEGACY.PRICE.SELECT_OFFER',
    CLEAR_OFFERS: 'LEGACY.PRICE.CLEAR_OFFERS',
    REQUESTED: 'LEGACY.PRICE.REQUESTED',
    RECEIVED: 'LEGACY.PRICE.RECEIVED',
    TIMEOUT: 'LEGACY.PRICE.TIMEOUT'
  },
  USER: {
    SHIPPING_ADDRESS_CHANGED: 'LEGACY.USER.SHIPPING_ADDRESS_CHANGED',
    CREATED: 'LEGACY.USER.CREATED',
    UPDATED: 'LEGACY.USER.UPDATED',
    SET_BILLING_ADDRESS: 'LEGACY.USER.SET_BILLING_ADDRESS',
    UTM_PARAMS_SET: 'LEGACY.USER.UTM_PARAMS_SET',
    CURRENCY_CHANGED: 'LEGACY.USER.CURRENCY_CHANGED'
  },
  ORDER: {
    ORDERED: 'LEGACY.ORDER.ORDERED',
    PAYED: 'LEGACY.ORDER.PAYED',
    STARTED: 'LEGACY.ORDER.STARTED',
    ABORTED: 'LEGACY.ORDER.ABORTED'
  },
  DIRECT_SALES: {
    RESTORE_CONFIGURATION: 'LEGACY.DIRECT_SALES.RESTORE_CONFIGURATION',
    CREATE_CONFIGURATION: 'LEGACY.DIRECT_SALES.CREATE_CONFIGURATION'
  }
}

export const MODAL_TYPE = {
  SHIPPING_ADDRESS: 'LEGACY.MODAL.SHIPPING_ADDRESS',
  FETCHING_PRICE: 'LEGACY.MODAL.FETCHING_PRICE',
  PRICE_CHANGED: 'LEGACY.MODAL.PRICE_CHANGED',
  PRICE_LOCATION_CHANGED: 'LEGACY.MODAL.PRICE_LOCATION_CHANGED',
  MATERIAL: 'LEGACY.MODAL.MATERIAL',
  FATAL_ERROR: 'LEGACY.MODAL.FATAL_ERROR'
}

export const ERROR_TYPE = {
  POLL_TIMEOUT: 'LEGACY.POLL_TIMEOUT',
  POLL_STOPPED: 'LEGACY.POLL_STOPPED',
  POLL_OVERWRITTEN: 'LEGACY.POLL_OVERWRITTEN',
  FILE_UPLOAD_FAILED: 'LEGACY.FILE_UPLOAD_FAILED',
  GET_PRICE_FAILED: 'LEGACY.GET_PRICE_FAILED',
  ORDER_FAILED: 'LEGACY.ORDER_FAILED'
}
