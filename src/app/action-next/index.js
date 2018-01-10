// @flow

import type {InitAction} from './init'
import type {CoreAction} from './core'
import type {ModalAction} from './modal'
import type {UserAction} from './user'
import type {ModelAction} from './model'

export type AppAction = InitAction | CoreAction | ModalAction | UserAction | ModelAction
