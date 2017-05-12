export const resolveAsyncThunk = (type, payload) => (dispatch) => {
  const action = {type, payload}
  return Promise.resolve(action).then(dispatch)
}

export const rejectAsyncThunk = (type, error = new Error(), payload) => async (dispatch) => {
  const action = {type, payload}

  dispatch(action)
  throw error
}
