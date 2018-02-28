// @flow

import type {AppAction, ConfigId, FinishGroupId, MaterialId, MaterialGroupId} from '../type-next'

export type MaterialState = {
  configIds: Array<ConfigId>,
  finishGroupId: ?FinishGroupId,
  materialId: ?MaterialId,
  materialGroupId: ?MaterialGroupId
}

const initialState: MaterialState = {
  configIds: [],
  finishGroupId: null,
  materialId: null,
  materialGroupId: null
}

const chooseMaterial = (state, action) => ({
  configIds: action.payload.ids,
  finishGroupId: null,
  materialId: null,
  materialGroupId: null
})

// TODOS:
// - gemeinsamkeinten identifizieren
// - actions für die verschiedenen material levels

const reducer = (state: MaterialState = initialState, action: AppAction): MaterialState => {
  switch (action.type) {
    case 'MATERIAL.CHOOSE':
      return chooseMaterial(state, action)
    default:
      return state
  }
}

export default reducer
