import {createAction} from 'redux-actions'

import TYPE from '../type'
import * as printingEngine from '../lib/printing-engine'

export const selectMaterial = createAction(TYPE.MATERIAL.SELECTED)
export const receivedMaterial = createAction(TYPE.MATERIAL.RECEIVED)

// Async actions
export const getMaterials = () => async (dispatch) => {
  const materials = await printingEngine.listMaterials()
  return dispatch(receivedMaterial(materials))
}
