import {detectAddress, createUser} from './user'
import {getMaterials} from './material'

export default () => async (dispatch) => {
  await dispatch(getMaterials())
  await dispatch(detectAddress())
  await dispatch(createUser())
}
