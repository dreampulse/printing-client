// @flow

import type {Dispatch} from 'redux'
import * as printingEngine from 'Lib/printing-engine'
import {createAction} from 'redux-actions'
import {routerActions} from 'react-router-redux'
import {getBaseUrl} from 'Service/location'

import {createPriceRequest} from './price'
import {selectMaterialConfig} from './material'

import type {State, Configuration} from '../type'
import TYPE from '../action-type'

const restoreConfigurationAction = createAction(
  TYPE.DIRECT_SALES.RESTORE_CONFIGURATION,
  (configuration: Configuration) => configuration
)
const createConfigurationAction = createAction(TYPE.DIRECT_SALES.CREATE_CONFIGURATION)

export const createConfiguration = (includeMaterialConfig: boolean) => async (
  dispatch: Dispatch<*>,
  getState: () => State
) => {
  const {model: {numberOfUploads, models}, material: {selectedMaterialConfig}} = getState()

  if (numberOfUploads !== 0) {
    return // Assure that upload of all models is finished.
  }

  const configuration = {
    items: models.map(model => {
      if (!model.uploadFinished) throw new Error('Upload still in progress')
      const {modelId, quantity} = model
      return {
        modelId,
        quantity
      }
    }),
    materialConfigId: undefined
  }

  if (includeMaterialConfig) {
    configuration.materialConfigId = selectedMaterialConfig
  }

  const {configurationId} = await printingEngine.createConfiguration(configuration)
  const path = `/configuration/${configurationId}`
  const shareUrl = `${getBaseUrl()}${path}`

  // TODO: This is just a temporary solution. We don't a UI for that. (just internal jet)
  dispatch(routerActions.push(path))

  dispatch(createConfigurationAction(shareUrl))
}

export const restoreConfiguration = (configurationId: string) => async (
  dispatch: Dispatch<*>,
  getState: () => State
) => {
  const configuration = await printingEngine.getConfiguration(configurationId)
  dispatch(restoreConfigurationAction(configuration))
  if (getState().user.userId) {
    dispatch(selectMaterialConfig(configuration.materialConfigId))
    dispatch(createPriceRequest())
  }
}
