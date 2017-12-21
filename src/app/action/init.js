import {detectAddress, createUser, setUtmParams} from './user'
import {getMaterials} from './material'
import {openAddressModal} from './modal'

export const init = () => dispatch =>
  Promise.all([
    dispatch(setUtmParams()),
    dispatch(getMaterials()),
    dispatch(detectAddress())
      .then(() => dispatch(createUser()))
      .catch(() => dispatch(openAddressModal()))
  ])
