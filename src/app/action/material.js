import {createAction} from 'redux-actions'

import TYPE from '../../../src/app/type'

export default function create ({printingEngine}) {
  const getMaterials = () => async dispatch => {
    const materials = await printingEngine.getMaterials()
    dispatch(createAction(TYPE.MATERIAL.RECEIVED)(materials))
  }

  return {
    getMaterials
  }
}
