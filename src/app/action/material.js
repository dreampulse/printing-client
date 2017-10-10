import cloneDeep from 'lodash/cloneDeep'
import {createAction} from 'redux-actions'

import * as printingEngine from 'Lib/printing-engine'
import {
  generateMaterialIds
} from 'Lib/material'
import {createPriceRequest} from './price'
import TYPE from '../type'

// Sync actions
export const selectMaterialConfigForFinishGroup = ({materialConfigId, finishGroupId}) => (
  createAction(TYPE.MATERIAL.CONFIG_FOR_FINISH_GROUP_SELECTED)({
    [finishGroupId]: materialConfigId
  })
)
export const selectMaterialConfig = createAction(TYPE.MATERIAL.CONFIG_SELECTED)

// Async actions
export const selectMaterial = materialId => async (dispatch) => {
  dispatch(createAction(TYPE.MATERIAL.SELECTED)(materialId))

  return dispatch(createPriceRequest())
}

export const getMaterials = () => async (dispatch) => {
  const materials = cloneDeep(await printingEngine.listMaterials())
  generateMaterialIds(materials)

  return dispatch(createAction(TYPE.MATERIAL.RECEIVED)(materials))
}
