import {getModel, getCmd} from 'redux-loop'
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

export const reduceState = oldState => actionArg => {
  const actions = Array.isArray(actionArg) ? actionArg : [actionArg]
  const {state, cmds} = actions.reduce(
    (result, action) => {
      const reducerResult = reducer(result.state, action)
      const c = getCmd(reducerResult)

      if (c.type === 'LIST') {
        result.cmds.push(...c.cmds)
      } else {
        result.cmds.push(c)
      }

      result.state = getModel(reducerResult)

      return result
    },
    {state: oldState, cmds: []}
  )
  const filterCmds = ({func, args}) =>
    cmds.filter(c => {
      // We need to compare the function source because
      // in mocha's watch mode, strict equality checks won't work
      if (c.func !== func) return false
      if (!args) return true

      try {
        expect(c.args, 'to satisfy', args)

        return true
      } catch (err) {
        return false
      }
    })

  return {
    state,
    cmds,
    dispatch: action => reduceState(state)(action),
    simulate: ({func, args, result, dispatchResult = false}) => {
      const cmdsToSimulate = filterCmds({func, args})

      if (cmdsToSimulate.length === 0) {
        expect.fail(output => {
          output
            .error('No command found for simulation')
            .sp()
            .jsFunctionName(func.name)
          if (args) {
            output
              .sp()
              .text('with arguments')
              .sp()
              .appendInspected(args)
          }
        })
      }

      const resultingActions = cmdsToSimulate.map(cmdToSimulate =>
        cmdToSimulate.simulate({
          success: result instanceof Error === false,
          result
        })
      )
      const filterActions = wantedAction =>
        resultingActions.filter(({type, payload}) => {
          if (wantedAction.type !== type) {
            return false
          }

          try {
            expect(wantedAction.payload, 'to satisfy', payload)

            return true
          } catch (err) {
            return false
          }
        })

      if (dispatchResult === true) {
        return reduceState(state)(resultingActions)
      }

      return {
        state,
        actions: resultingActions,
        dispatch(wantedAction) {
          const actionsToDispatch = filterActions(wantedAction)

          if (actionsToDispatch.length === 0) {
            expect.fail(output => {
              output
                .error('Action ')
                .appendInspected(wantedAction)
                .error(' not found in simulation results')
            })
          }

          return reduceState(state)(actionsToDispatch)
        }
      }
    }
  }
}

// testDispatch always starts on the initial state
export const testDispatch = reduceState(undefined)
