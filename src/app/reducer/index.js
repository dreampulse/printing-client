import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import App from './app'
import Modal from './modal'
import Model from './model'

const app = App()
const modal = Modal()
const model = Model()

const rootReducer = combineReducers({
  app,
  modal,
  model,
  routing: routerReducer
})

export default rootReducer
