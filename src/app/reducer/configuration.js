import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  configurationId: null,
  configuration: null
}

function handleConfigurationRestored (state, {payload}) {
  return {
    ...state,
    configurationId: payload._id, // eslint-disable-line no-underscore-dangle
    configuration: payload
  }
}

export default handleActions({
  [TYPE.DIRECT_SALES.RESTORE_CONFIGURATION]: handleConfigurationRestored
}, initialState)
