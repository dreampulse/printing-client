import {getModel, getCmd} from 'redux-loop'
import isEqual from 'lodash/isEqual'
import reducer from 'App/reducer-next'

export const resolveAsyncThunk = (type, payload) => dispatch => {
  const action = {type, payload}
  return Promise.resolve(action).then(dispatch)
}

export const rejectAsyncThunk = (type, error = new Error(), payload) => async dispatch => {
  const action = {type, payload}

  dispatch(action)
  throw error
}

// With this mock store you can have changing states
// when certain actions have been dispatched.
export const createMockStore = (initialState, nextStates = []) => {
  let nextStatePos = 0
  let state = initialState
  const getState = () => state
  const store = mockStore(getState)

  store.subscribe(() => {
    const actions = store.getActions()
    const lastAction = actions[actions.length - 1]
    const nextState = nextStates[nextStatePos]
    if (nextState && nextState.type === lastAction.type) {
      state = nextState.state
      nextStatePos++
    }
  })

  return store
}

const reduceState = oldState => action => {
  const reducerResult = reducer(undefined, action)
  const state = getModel(reducerResult)
  const cmd = getCmd(reducerResult)

  return {
    state,
    simulate: ({func, args, result}) => {
      const cmds = cmd.type === 'LIST' ? cmd.cmds : [cmd]

      const cmdsToSimulate = cmds.filter(
        // We need to compare the function source because
        // in mocha's watch mode, strict equality checks won't work
        c => c.func.toString() === func.toString() && isEqual(c.args, args)
      )

      if (cmdsToSimulate.length === 0) {
        expect.fail(output => {
          output
            .error('No command found for simulation')
            .sp()
            .jsFunctionName(func.name)
            .sp()
            .text('with arguments')
            .sp()
            .appendInspected(args)
        })
      }

      const actions = cmdsToSimulate.map(cmdToSimulate =>
        cmdToSimulate.simulate({
          success: result instanceof Error === false,
          result
        })
      )

      return {
        state,
        actions,
        dispatch(wantedAction) {
          const actionToDispatch = actions.find(
            ({type, payload}) =>
              wantedAction.type === type && isEqual(wantedAction.payload, payload)
          )

          if (!actionToDispatch) {
            expect.fail(output => {
              output
                .error('Action ')
                .appendInspected(wantedAction)
                .error(' not found in simulation results')
            })
          }

          return reduceState(state)(actionToDispatch)
        }
      }
    }
  }
}

// testDispatch always starts on the initial state
export const testDispatch = reduceState(undefined)
