import * as printingEngine from 'Lib/printing-engine'
import {createAction} from 'redux-actions'
import {routerActions} from 'react-router-redux'
import {getBaseUrl} from 'Service/location'

import {createPriceRequest} from './price'

import TYPE from '../action-type'

const restoreConfigurationAction = createAction(TYPE.DIRECT_SALES.RESTORE_CONFIGURATION)
const createConfigurationAction = createAction(TYPE.DIRECT_SALES.CREATE_CONFIGURATION)

export const createConfiguration = includeMaterialConfig => async (dispatch, getState) => {
  const {
    model: {
      numberOfUploads,
      models
    },
    material: {
      selectedMaterialConfig
    }
  } = getState()

  if (numberOfUploads !== 0) {
    return // Assure that upload of all models is finished.
  }

  const configuration = {
    items: models.map(model => ({
      modelId: model.modelId,
      quantity: model.quantity
    }))
  }

  if (includeMaterialConfig) {
    configuration.materialConfigId = selectedMaterialConfig
  }

  const {configurationId} = await printingEngine.createConfiguration(configuration)
  const path = `/configuration/${configurationId}`
  const shareUrl = `${getBaseUrl()}${path}`

  // TODO: This is just a temporary solution until we have the UI components for that.
  dispatch(routerActions.push(path))

  dispatch(createConfigurationAction(shareUrl))
}

export const restoreConfiguration = (configurationId, {refresh}) => async (dispatch, getState) => {
  const configuration = await printingEngine.getConfiguration(configurationId)
  dispatch(restoreConfigurationAction(configuration))
  if (getState().user.userId) {
    dispatch(createPriceRequest({refresh}))
  }
}
