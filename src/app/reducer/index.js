import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'

import user from './user'
import modal from './modal'
import model from './model'
import material from './material'
import price from './price'
import order from './order'
import configuration from './configuration'

const rootReducer = combineReducers({
  legacy: combineReducers({
    user,
    modal,
    model,
    material,
    price,
    order,
    configuration,
    routing: routerReducer,
    form: formReducer
  })
})

export default rootReducer
