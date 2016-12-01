import {createAction} from 'redux-actions'

import TYPE from '../../../src/app/type'

export default function create ({api}) {
  const getMaterials = () => async dispatch => {
    const materials = await api.printingEngine.getMaterials()
    dispatch(createAction(TYPE.MATERIAL.RECEIVED)(materials))
  }

  return {
    getMaterials
  }
}
