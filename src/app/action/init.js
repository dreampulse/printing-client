import {detectAddress} from './user'
import {getMaterials} from './material'

export default () => async (dispatch) => {
  dispatch(detectAddress())
  dispatch(getMaterials())
}
