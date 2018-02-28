// @flow

import type {InitAction} from './init'
import type {CoreAction} from './core'
import type {ModalAction} from './modal'
import type {UserAction} from './user'
import type {ModelAction} from './model'
import type {MaterialAction} from './material'
import type {TimeoutAction} from './timeout'
import type {PollingAction} from './polling'

export type AppAction =
  | InitAction
  | CoreAction
  | ModalAction
  | UserAction
  | ModelAction
  | MaterialAction
  | TimeoutAction
  | PollingAction
