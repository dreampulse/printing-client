import * as printingEngine from 'Lib/printing-engine'
import {createAction} from 'redux-actions'
import {routerActions} from 'react-router-redux'
import {getBaseUrl} from 'Service/location'

import {createPriceRequest} from './price'

import TYPE from '../type'

const restoreConfigurationAction = createAction(TYPE.DIRECT_SALES.RESTORE_CONFIGURATION)
const crateConfigurationAction = createAction(TYPE.DIRECT_SALES.CREATE_CONFIGURATION)

export const createConfiguration = () => async (dispatch, getState) => {
  if (getState().model.numberOfUploads !== 0) {
    return  // Assure that upload of all model are finished
  }

  const configuration = {
    items: getState().model.models.map(model => ({
      modelId: model.modelId,
      quantity: model.quantity
    }))
  }

  const {configurationId} = await printingEngine.createConfiguration(configuration)
  const shareUrl = `${getBaseUrl()}/configuration/${configurationId}`

  // TODO: This is just a temporary solution until we have the UI-Componentes for that
  dispatch(routerActions.push(`/configuration/${configurationId}`))

  dispatch(crateConfigurationAction(shareUrl))
}

export const restoreConfiguration = configurationId => async (dispatch) => {
  const configuration = await printingEngine.getConfiguration(configurationId)
  dispatch(restoreConfigurationAction(configuration))
  dispatch(createPriceRequest({isEstimate: false})) // fetch real prices for direct sales
}
