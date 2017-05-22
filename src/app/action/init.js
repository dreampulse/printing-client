import {detectAddress, createUser} from './user'
import {getMaterials} from './material'

export const init = () => dispatch => (
  Promise.all([
    dispatch(getMaterials()),
    dispatch(detectAddress())
      .then(() => dispatch(createUser()))
  ])
)
