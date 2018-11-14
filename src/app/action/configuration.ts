import uniqueId from 'lodash/uniqueId'

import {Action, ConfigId, ConfigurationId, BackendModel} from '../type'
import {BackendConfiguration} from '../lib/printing-engine'

export type LoadConfigurationAction = Action<'CONFIGURATION.LOAD_CONFIGURATION', {id: ConfigurationId}>
export type ConfigurationReceivedAction = Action<
  'CONFIGURATION.CONFIGURATION_RECEIVED',
  {
    items: Array<BackendModel & {id: ConfigId; quantity: number}>
  }
>
export type ConfigurationAction = LoadConfigurationAction | ConfigurationReceivedAction

export const loadConfiguration = (id: ConfigurationId): LoadConfigurationAction => ({
  type: 'CONFIGURATION.LOAD_CONFIGURATION',
  payload: {id}
})

export const configurationReceived = (
  payload: BackendConfiguration
): ConfigurationReceivedAction => ({
  type: 'CONFIGURATION.CONFIGURATION_RECEIVED',
  payload: {
    items: payload.items.map(item => ({
      ...item,
      id: uniqueId('config-id-')
    }))
  }
})
