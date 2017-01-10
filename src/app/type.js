// Action types

export default {
  MODAL: {
    OPEN: 'MODAL.OPEN',
    CLOSE: 'MODAL.CLOSE'
  },
  APP: {
    FOO_ACTION: 'APP.FOO_ACTION'
  },
  MODEL: {
    UPLOAD_FINISHED: 'MODEL.UPLOAD_FINISHED',
    UPLOAD_STARTED: 'MODEL.UPLOAD_STARTED',
    UPLOAD_ABORTED: 'MODEL.UPLOAD_ABORTED'
  },
  MATERIAL: {
    RECEIVED: 'MATERIAL.RECEIVED',
    SELECTED: 'MATERIAL.SELECTED'
  },
  PRICE: {
    REQUEST_CREATED: 'PRICE.REQUEST_CREATED',
    RECEIVED: 'PRICE.RECEIVED',
    VENDOR_SELECTED: 'PRICE.VENDOR_SELECTED',
    ERROR: 'PRICE.ERROR'
  },
  USER: {
    SHIPPING_ADDRESS_CHANGED: 'USER.SHIPPING_ADDRESS_CHANGED',
    SHIPPING_ADDRESS_DETECTION_FAILED: 'USER.SHIPPING_ADDRESS_DETECTION_FAILED',
    CREATED: 'USER.CREATED'
  },
  CART: {
    REQUEST_CREATED: 'CART.REQUEST_CREATED',
    RECEIVED_FINAL_PRICE: 'CART.RECEIVED_FINAL_PRICE'
  },
  ORDER: {
    SUCCESS: 'ORDER.SUCCESS'
  }
}
