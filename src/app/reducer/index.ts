import {combineReducers} from 'redux-loop'
import {routerReducer as routing, RouterState} from 'react-router-redux'
import {reducer as form, FormStateMap} from 'redux-form'

import core from './core'
import {CoreState} from './core'
import modal from './modal'
import {ModalState} from './modal'
import timeout from './timeout'
import {TimeoutState} from './timeout'
import polling from './polling'
import {PollingState} from './polling'

export type AppState = {
  core: CoreState
  modal: ModalState
  timeout: TimeoutState
  polling: PollingState
  routing: RouterState // Managed by react-router-redux
  form: FormStateMap // Managed by redux-form
}

const rootReducer = combineReducers({
  core,
  modal,
  timeout,
  polling,
  routing,
  form
} as any)

export default rootReducer
