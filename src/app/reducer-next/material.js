// @flow

import type {AppAction, ConfigId} from '../type-next'

export type MaterialState = {
  configIds: Array<ConfigId>
}

const initialState: MaterialState = {
  configIds: []
}

const chooseMaterial = (state, action) => ({
  configIds: action.payload.ids
})

const reducer = (state: MaterialState = initialState, action: AppAction): MaterialState => {
  switch (action.type) {
    case 'MATERIAL.CHOOSE':
      return chooseMaterial(state, action)
    default:
      return state
  }
}

export default reducer
