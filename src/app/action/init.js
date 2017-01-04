import { getMaterials } from './material'

export default () => async dispatch => {
  await dispatch(getMaterials())
}
