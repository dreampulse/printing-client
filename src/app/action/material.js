import {createAction} from 'redux-actions'

import * as printingEngine from 'Lib/printing-engine'
import {
  generateMaterialIds,
  getDefaultMaterialConfigs
} from 'Lib/material'
import TYPE from '../type'

// Sync actions
export const selectMaterial = createAction(TYPE.MATERIAL.SELECTED)
export const selectMaterialConfig = (finishGroupId, materialConfigId) => (
  createAction(TYPE.MATERIAL.CONFIG_SELECTED)({
    [finishGroupId]: materialConfigId
  })
)

// Async actions
export const getMaterials = () => async (dispatch) => {
  const materials = await printingEngine.listMaterials()
  generateMaterialIds(materials)

  dispatch(createAction(TYPE.MATERIAL.RECEIVED)(materials))

  const selectedDefaultConfigs = getDefaultMaterialConfigs(materials)
  dispatch(createAction(TYPE.MATERIAL.CONFIG_SELECTED)(selectedDefaultConfigs))
}
