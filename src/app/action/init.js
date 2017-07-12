import {detectAddress, createUser} from './user'
import {getMaterials} from './material'
import {openAddressModal} from './modal'

export const init = () => dispatch => (
  Promise.all([
    dispatch(getMaterials()),
    dispatch(detectAddress())
      .then(() => dispatch(createUser()))
      .catch(() => dispatch(openAddressModal()))
  ])
)
