// @flow

import {combineReducers} from 'redux-loop'
import {routerReducer as routing} from 'react-router-redux'
import {reducer as form} from 'redux-form'

import type {State as LegacyState} from '../type'
import core from '../reducer-next/core'
import type {CoreState} from '../reducer-next/core'
import user from '../reducer-next/user'
import type {UserState} from '../reducer-next/user'
import modal from '../reducer-next/modal'
import type {ModalState} from '../reducer-next/modal'
import model from '../reducer-next/model'
import type {ModelState} from '../reducer-next/model'
import material from '../reducer-next/material'
import type {MaterialState} from '../reducer-next/material'

export type AppState = {
  core: CoreState,
  model: ModelState,
  modal: ModalState,
  user: UserState,
  material: MaterialState,
  legacy: LegacyState,
  routing: any, // Managed by react-router-redux
  form: any // Managed by redux-form
}

const rootReducer = combineReducers({
  core,
  user,
  modal,
  model,
  material,
  // third-party modules expect their state to be at the top-level
  routing,
  form
})

export default rootReducer
