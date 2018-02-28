// @flow

import {combineReducers} from 'redux-loop'
import {routerReducer as routing} from 'react-router-redux'
import {reducer as form} from 'redux-form'

import core from './core'
import type {CoreState} from './core'
import user from './user'
import type {UserState} from './user'
import modal from './modal'
import type {ModalState} from './modal'
import model from './model'
import type {ModelState} from './model'
import timeout from './timeout'
import type {TimeoutState} from './timeout'
import polling from './polling'
import type {PollingState} from './polling'

export type AppState = {
  core: CoreState,
  model: ModelState,
  modal: ModalState,
  user: UserState,
  timeout: TimeoutState,
  polling: PollingState,
  routing: any, // Managed by react-router-redux
  form: any // Managed by redux-form
}

const rootReducer = combineReducers({
  core,
  user,
  modal,
  model,
  timeout,
  polling,
  // third-party modules expect their state to be at the top-level
  routing,
  form
})

export default rootReducer
