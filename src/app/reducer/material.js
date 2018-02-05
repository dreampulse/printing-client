// @flow

import type {MaterialState} from '../type'
import TYPE, {type Action} from '../action-type'

const initialState = {
  materialGroups: undefined,
  selectedMaterialGroup: undefined,
  selectedMaterial: undefined,
  selectedMaterialConfig: undefined,
  selectedMaterialConfigs: {},
  materialFilter: ''
}

function handleRestoreConfiguration(state, {payload: {materialConfigId}}) {
  return {
    ...state,
    selectedMaterialConfig: materialConfigId
  }
}

function handleReceivedMaterials(state, {payload}) {
  return {
    ...state,
    materialGroups: payload
  }
}

function handleSelectedMaterialGroup(state, {payload}) {
  return {
    ...state,
    selectedMaterialGroup: payload,
    materialFilter: '',
    selectedMaterial: undefined,
    selectedMaterialConfig: undefined
  }
}

function handleSelectedMaterial(state, {payload}) {
  return {
    ...state,
    selectedMaterial: payload,
    selectedMaterialConfig: undefined
  }
}

function handleSelectedMaterialConfig(state, {payload}) {
  return {
    ...state,
    selectedMaterialConfig: payload
  }
}

function handleSelectedMaterialConfigForFinishGroup(state, {payload}) {
  return {
    ...state,
    selectedMaterialConfigs: {
      ...state.selectedMaterialConfigs,
      ...payload
    },
    selectedMaterialConfig: undefined
  }
}

function handleFilterMaterials(state, {payload}) {
  return {
    ...state,
    materialFilter: payload,
    selectedMaterialGroup: undefined,
    selectedMaterial: undefined,
    selectedMaterialConfig: undefined
  }
}

const reducer = (state: MaterialState = initialState, action: Action): MaterialState => {
  switch (action.type) {
    case TYPE.MATERIAL.RECEIVED:
      return handleReceivedMaterials(state, action)
    case TYPE.MATERIAL.SELECTED:
      return handleSelectedMaterial(state, action)
    case TYPE.MATERIAL.GROUP_SELECTED:
      return handleSelectedMaterialGroup(state, action)
    case TYPE.MATERIAL.CONFIG_SELECTED:
      return handleSelectedMaterialConfig(state, action)
    case TYPE.MATERIAL.CONFIG_FOR_FINISH_GROUP_SELECTED:
      return handleSelectedMaterialConfigForFinishGroup(state, action)
    case TYPE.MATERIAL.FILTER:
      return handleFilterMaterials(state, action)
    case TYPE.DIRECT_SALES.RESTORE_CONFIGURATION:
      return handleRestoreConfiguration(state, action)

    default:
      return state
  }
}

export default reducer
