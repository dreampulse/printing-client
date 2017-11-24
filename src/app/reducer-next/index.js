// @flow

import {combineReducers} from 'redux-loop'

import core from './core'
import user from './user'
import modal from './modal'

const rootReducer = combineReducers({
  core,
  user,
  modal
})

export default rootReducer
