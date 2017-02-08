import {detectAddress, createUser} from './user'
import {getMaterials} from './material'

export default () => async (dispatch) => {
  dispatch(getMaterials())

  await dispatch(detectAddress())
  dispatch(createUser())
}
