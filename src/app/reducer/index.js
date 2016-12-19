import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import app from './app'
import user from './user'
import modal from './modal'
import model from './model'
import material from './material'
import price from './price'
import shoppingCart from './shopping-cart'

const rootReducer = combineReducers({
  app,
  user,
  modal,
  model,
  material,
  price,
  shoppingCart,
  routing: routerReducer
})

export default rootReducer
