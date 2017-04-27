import {detectAddress, createUser} from './user'
import {getMaterials} from './material'
import {openAddressModal} from './modal'

// Refactor to keep meaningful promise chain
export default () => async (dispatch) => {
  dispatch(getMaterials())

  try {
    await dispatch(detectAddress())
    dispatch(createUser())
  } catch (e) {
    // Throw error if error is not from detectAddress
    dispatch(openAddressModal())
  }
}
