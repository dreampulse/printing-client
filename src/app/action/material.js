import {createAction} from 'redux-actions'

import TYPE from '../type'
import * as printingEngine from '../lib/printing-engine'

// Sync actions
export const selectMaterial = createAction(TYPE.MATERIAL.SELECTED)

// Async actions
export const getMaterials = () => async (dispatch) => {
  const materials = await printingEngine.listMaterials()
  return dispatch(createAction(TYPE.MATERIAL.RECEIVED)(materials))
}
