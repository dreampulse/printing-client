import {detectAddress, openAddressModal, createUser} from './user'
import {getMaterials} from './material'

export default () => async (dispatch) => {
  dispatch(getMaterials())

  try {
    await dispatch(detectAddress())
    dispatch(createUser())
  } catch (e) {
    dispatch(openAddressModal())
  }
}
