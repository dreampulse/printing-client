import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  selected: undefined,
  materials: null
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
    selected: payload
  }
}

export default handleActions({
  [TYPE.MATERIAL.RECEIVED]: handleReceivedMaterials,
  [TYPE.MATERIAL.SELECTED]: handleSelectedMaterial
}, initialState)

