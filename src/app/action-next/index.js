// @flow

import type {InitAction} from './init'
import type {CoreAction} from './core'
import type {ModalAction} from './modal'
import type {UserAction} from './user'
import type {ModelAction} from './model'
import type {ModelViewerAction} from './model-viewer'
import type {TimeoutAction} from './timeout'
import type {PollingAction} from './polling'
import type {QuoteAction} from './quote'

export type AppAction =
  | InitAction
  | CoreAction
  | ModalAction
  | UserAction
  | ModelAction
  | ModelViewerAction
  | TimeoutAction
  | PollingAction
  | QuoteAction
