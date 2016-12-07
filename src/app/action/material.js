import {createAction} from 'redux-actions'

import TYPE from '../../../src/app/type'
import * as printingEngine from '../lib/printing-engine'

export const getMaterials = () => async dispatch => {
  const materials = await printingEngine.listMaterials()
  dispatch(createAction(TYPE.MATERIAL.RECEIVED)(materials))
}
