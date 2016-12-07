import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {}

function handleReceivedMaterials (state, {payload}) {
  return payload
}

export default handleActions({
  [TYPE.MATERIAL.RECEIVED]: handleReceivedMaterials
}, initialState)

