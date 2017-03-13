import {detectAddress, createUser} from './user'
import {getMaterials} from './material'
import {openAddressModal} from './modal'

export default () => async (dispatch) => {
  dispatch(getMaterials())

  try {
    await dispatch(detectAddress())
    dispatch(createUser())
  } catch (e) {
    dispatch(openAddressModal())
  }
}
