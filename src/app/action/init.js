import {detectAddress, createUser} from './user'
import {getMaterials} from './material'
import {openAddressModal, openFatalErrorModal} from './modal'

import {ERROR_TYPE} from '../type'

export const init = () => dispatch => (
  Promise.all([
    dispatch(getMaterials()),
    dispatch(detectAddress())
      .then(() => dispatch(createUser()))
  ])
  .catch((error) => {
    if (error.type === ERROR_TYPE.DETECT_ADDRESS_FAILED) {
      dispatch(openAddressModal())
    } else {
      dispatch(openFatalErrorModal(error))
    }
  })
)
