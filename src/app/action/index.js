import * as printingEngine from '../lib/printing-engine'
import Modal from './modal'
import Model from './model'
import Material from './material'
import Price from './price'

export {routerActions} from 'react-router-redux'
export const modal = Modal({})
export const material = Material({printingEngine})
export const model = Model({printingEngine})
export const price = Price({printingEngine, material})
