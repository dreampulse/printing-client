// @flow

import {combineReducers} from 'redux-loop'
import core from './core'
import type {CoreState} from './core'
import user from './user'
import type {UserState} from './user'
import modal from './modal'
import type {ModalState} from './modal'

export type AppState = {
  core: CoreState,
  modal: ModalState,
  user: UserState,
  routing: any, // Managed by react-router-redux
  form: any // Managed by redux-form
}

const rootReducer = combineReducers({
  core,
  user,
  modal
})

export default rootReducer
