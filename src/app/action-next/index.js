// @flow

import type {CoreAction} from './core'
import type {ModalAction} from './modal'
import type {ModelAction} from './model'
import type {ModelViewerAction} from './model-viewer'
import type {TimeoutAction} from './timeout'
import type {PollingAction} from './polling'
import type {QuoteAction} from './quote'

export type AppAction =
  | CoreAction
  | ModalAction
  | ModelAction
  | ModelViewerAction
  | TimeoutAction
  | PollingAction
  | QuoteAction
