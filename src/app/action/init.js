import {detectAddress, createUser} from './user'
import {getMaterials} from './material'

export default () => async (dispatch) => {
  dispatch(getMaterials())
  dispatch(detectAddress())
  dispatch(createUser())
}
