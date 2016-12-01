import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import App from './app'
import Modal from './modal'
import Model from './model'
import Material from './material'

const app = App()
const modal = Modal()
const model = Model()
const material = Material()

const rootReducer = combineReducers({
  app,
  modal,
  model,
  material,
  routing: routerReducer
})

export default rootReducer
