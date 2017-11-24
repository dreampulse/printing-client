// @flow

export const TYPE = {
  OPEN_ADDRESS: 'MODAL.OPEN_ADDRESS',
  OPEN_FATAL_ERROR: 'MODAL.OPEN_FATAL_ERROR',
  CLOSE: 'MODAL.CLOSE'
}

export const close = () => ({
  type: TYPE.CLOSE
})

export const openAddress = () => ({
  type: TYPE.OPEN_ADDRESS
})

export const openFatalError = (message: string) => ({
  type: TYPE.OPEN_FATAL_ERROR,
  payload: message
})
