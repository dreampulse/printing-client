import {handleActions} from 'redux-actions'

import TYPE from '../type'

export default function create () {
  const initialState = {
    hello: 'hi!',
    foo: 0
  }

  function handleFooAction (state, action) {
    return {
      ...state,
      foo: state.foo + 1
    }
  }

  return handleActions({
    [TYPE.APP.FOO_ACTION]: handleFooAction
  }, initialState)
}
