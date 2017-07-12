import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  materials: undefined,
  selectedMaterial: undefined,
  selectedMaterialConfig: undefined,
  selectedMaterialConfigs: {}
}

function handleRestoreConfiguration (state, {payload}) {
  return {
    ...state,
    selectedMaterialConfig: payload.materialConfigId
  }
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
    selectedMaterialConfig: payload
  }
}

function handleSelectedMaterialConfigForFinishGroup (state, {payload}) {
  return {
    ...state,
    selectedMaterialConfigs: {
      ...state.selectedMaterialConfigs,
      ...payload
    },
    selectedMaterialConfig: undefined
  }
}

export default handleActions({
  [TYPE.MATERIAL.RECEIVED]: handleReceivedMaterials,
  [TYPE.MATERIAL.SELECTED]: handleSelectedMaterial,
  [TYPE.MATERIAL.CONFIG_SELECTED]: handleSelectedMaterialConfig,
  [TYPE.MATERIAL.CONFIG_FOR_FINISH_GROUP_SELECTED]: handleSelectedMaterialConfigForFinishGroup,
  [TYPE.DIRECT_SALES.RESTORE_CONFIGURATION]: handleRestoreConfiguration
}, initialState)
