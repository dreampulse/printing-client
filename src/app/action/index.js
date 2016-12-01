import * as api from '../lib/api'
import Modal from './modal'
import Model from './model'
import Material from './material'
import Price from './price'

export {routerActions} from 'react-router-redux'
export const modal = Modal({})
export const material = Material({api})
export const model = Model({api})
export const price = Price({api, material})
