import createStore from '../src/app/store'

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

export const createLegacyStore = (history, initialLegacyState) => {
  const store = createStore(history, {
    legacy: initialLegacyState
  })
  const getState = store.getState

  store.getState = () => getState.call(store).legacy

  return store
}

export const findCmd = (state, func, args) => {
  const cmd = getCmd(state).cmds.find(c => {
    // TODO: findCmd should just accept a cmd instance instead of a func and an args
    if (typeof func !== 'function') {
      try {
        expect(c, 'to satisfy', func)

        return true
      } catch (err) {
        return false
      }
    }
    if (c.func !== func) return false
    if (!args) return true

    try {
      expect(c.args, 'to satisfy', args)

      return true
    } catch (err) {
      return false
    }
  })

  if (!cmd) {
    expect.fail(output => {
      output
        .error('No command found matching')
        .sp()
        .jsFunctionName(func.name || JSON.stringify(func, undefined, '  '))
      if (args) {
        output
          .sp()
          .text('with arguments')
          .sp()
          .appendInspected(args)
      }
    })
  }

  return cmd
}

export const findAction = (state, actionOrFilter) =>
  getCmd(state)
    .cmds.map(c => c.actionToDispatch)
    .filter(action => Boolean(action))
    .find(action => {
      if (typeof actionOrFilter === 'function') return actionOrFilter(action)
      try {
        expect(action, 'to satisfy', actionOrFilter)

        return true
      } catch (err) {
        return false
      }
    })
