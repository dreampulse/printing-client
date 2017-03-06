import defaultsDeep from 'lodash/defaultsDeep'
import defaultConfig from './default'

export default defaultsDeep({
  printingEngineBaseUrl: 'https://printing-engine.all3dp.com/v1',
  googleMapsApiKey: 'TODO'
}, defaultConfig)
