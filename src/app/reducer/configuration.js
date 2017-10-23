// @flow

import type {ConfigurationState} from '../type'
import TYPE, {type Action} from '../action-type'

const initialState = {
  configurationId: null,
  isDirectSales: false
}

function handleConfigurationRestored(state, {payload}) {
  return {
    ...state,
    configurationId: payload._id, // eslint-disable-line no-underscore-dangle
    isDirectSales: Boolean(payload.materialConfigId)
  }
}

const reducer = (state: ConfigurationState = initialState, action: Action): ConfigurationState => {
  switch (action.type) {
    case TYPE.DIRECT_SALES.RESTORE_CONFIGURATION:
      return handleConfigurationRestored(state, action)

    default:
      return state
  }
}

export default reducer
