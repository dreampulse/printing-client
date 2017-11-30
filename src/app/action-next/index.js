// @flow

import type {InitAction} from './init'
import type {CoreAction} from './core'
import type {ModalAction} from './modal'
import type {UserAction} from './user'

export type AppAction = InitAction | CoreAction | ModalAction | UserAction
