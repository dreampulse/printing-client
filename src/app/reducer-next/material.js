// @flow
import {loop, Cmd} from 'redux-loop'

import type {AppAction, ConfigId} from '../type-next'

import {goToMaterial} from '../action-next/navigation'

export type MaterialState = {
  configIds: Array<ConfigId>
}

const initialState: MaterialState = {
  configIds: []
}

const choose = (state, action) =>
  loop(
    {
      configIds: action.payload.ids
    },
    Cmd.action(goToMaterial())
  )

const reducer = (state: MaterialState = initialState, action: AppAction): MaterialState => {
  switch (action.type) {
    case 'MATERIAL.CHOOSE':
      return choose(state, action)
    default:
      return state
  }
}

export default reducer
