// @flow

import type {MaterialState} from '../type'
import TYPE, {type Action} from '../action-type'

const initialState = {
  materials: undefined,
  selectedMaterial: undefined,
  selectedMaterialConfig: undefined,
  selectedMaterialConfigs: {}
}

function handleRestoreConfiguration (state, {payload: {materialConfigId}}) {
  return {
    ...state,
    selectedMaterialConfig: materialConfigId
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

const reducer = (state : MaterialState = initialState, action: Action) : MaterialState => {
  switch (action.type) {
    case TYPE.MATERIAL.RECEIVED: return handleReceivedMaterials(state, action)
    case TYPE.MATERIAL.SELECTED: return handleSelectedMaterial(state, action)
    case TYPE.MATERIAL.CONFIG_SELECTED: return handleSelectedMaterialConfig(state, action)
    case TYPE.MATERIAL.CONFIG_FOR_FINISH_GROUP_SELECTED:
      return handleSelectedMaterialConfigForFinishGroup(state, action)
    case TYPE.DIRECT_SALES.RESTORE_CONFIGURATION: return handleRestoreConfiguration(state, action)

    default: return state
  }
}

export default reducer
