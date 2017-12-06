import {createStore, compose} from 'redux'
import {install as installReduxLoop} from 'redux-loop'

import reducer from './reducer-next'

const enhancer = compose(
  installReduxLoop()
  // applyMiddleware(someMiddleware),
)

export default (initialState = {}) => createStore(reducer, initialState, enhancer)
