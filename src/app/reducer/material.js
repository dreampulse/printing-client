import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  selectedMaterial: undefined,
  materials: null,
  selectedMaterialConfigs: {}
}

function handleReceivedMaterials (state, {payload}) {
  return {
    ...state,
    materials: payload
  }
}

function handleSelectedMaterial (state, {payload}) {
  return {
    ...state,
    selectedMaterial: payload
  }
}

function handleSelectedMaterialConfig (state, {payload}) {
  return {
    ...state,
    selectedMaterialConfigs: {
      ...state.selectedMaterialConfigs,
      ...payload
    }
  }
}

export default handleActions({
  [TYPE.MATERIAL.RECEIVED]: handleReceivedMaterials,
  [TYPE.MATERIAL.SELECTED]: handleSelectedMaterial,
  [TYPE.MATERIAL.CONFIG_SELECTED]: handleSelectedMaterialConfig
}, initialState)

