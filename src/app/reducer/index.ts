import {combineReducers} from 'redux-loop'
import {routerReducer as routing, RouterState} from 'react-router-redux'

import core from './core'
import {CoreState} from './core'
import modal from './modal'
import {ModalState} from './modal'
import timeout from './timeout'
import {TimeoutState} from './timeout'
import polling from './polling'
import {PollingState} from './polling'
import modelViewer from './model-viewer'
import {ModelViewerState} from './model-viewer'

export type AppState = {
  core: CoreState
  modal: ModalState
  timeout: TimeoutState
  polling: PollingState
  modelViewer: ModelViewerState
  routing: RouterState // Managed by react-router-redux
}

const rootReducer = combineReducers({
  core,
  modal,
  timeout,
  polling,
  modelViewer,
  routing
} as any)

export default rootReducer
