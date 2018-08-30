// @flow

import type {Action, ConfigurationId} from '../type'
import type {BackendConfiguration} from '../lib/printing-engine'

type LoadConfigurationAction = Action<'CONFIGURATION.LOAD_CONFIGURATION', {id: ConfigurationId}>
type ConfigurationReceivedAction = Action<
  'CONFIGURATION.CONFIGURATION_RECEIVED',
  BackendConfiguration
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
  payload
})
