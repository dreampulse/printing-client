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
    // Some legacy containers and selectors require these third-party states
    routing: routerReducer,
    form: formReducer
  }),
  // third-party modules expect their state to be at the top-level
  routing: routerReducer,
  form: formReducer
})

export default rootReducer
