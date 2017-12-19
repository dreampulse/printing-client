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
import legacyUser from './user'
import legacyModal from './modal'
import legacyModel from './model'
import legacyMaterial from './material'
import legacyPrice from './price'
import legacyOrder from './order'
import legacyConfiguration from './configuration'

export type AppState = {
  core: CoreState,
  modal: ModalState,
  user: UserState,
  legacy: LegacyState,
  routing: any, // Managed by react-router-redux
  form: any // Managed by redux-form
}

const rootReducer = combineReducers({
  core,
  user,
  modal,
  legacy: combineReducers({
    user: legacyUser,
    modal: legacyModal,
    model: legacyModel,
    material: legacyMaterial,
    price: legacyPrice,
    order: legacyOrder,
    configuration: legacyConfiguration,
    // Some legacy containers and selectors require these third-party states
    routing,
    form
  }),
  // third-party modules expect their state to be at the top-level
  routing,
  form
})

export default rootReducer
