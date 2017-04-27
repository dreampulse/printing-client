export const createAsyncThunk = (type, payload) => (dispatch) => {
  const action = {type, payload}
  return Promise.resolve(action).then(dispatch)
}
