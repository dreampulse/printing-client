import {CoreAction} from './core'
import {ModalAction} from './modal'
import {ModelAction} from './model'
import {TimeoutAction} from './timeout'
import {PollingAction} from './polling'
import {QuoteAction} from './quote'
import {CartAction} from './cart'
import {OrderAction} from './order'
import {ConfigurationAction} from './configuration'

export type Actions =
  | CoreAction
  | ModalAction
  | ModelAction
  | TimeoutAction
  | PollingAction
  | QuoteAction
  | CartAction
  | OrderAction
  | ConfigurationAction
