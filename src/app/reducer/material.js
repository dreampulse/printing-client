import {handleActions} from 'redux-actions'

import TYPE from '../type'

export default function create () {
  const initialState = {}

  function handleReceivedMaterials(state, {payload}) {
    return payload
  }

  return handleActions({
    [TYPE.MATERIAL.RECEIVED]: handleReceivedMaterials
  }, initialState)
}
