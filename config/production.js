import defaultsDeep from 'lodash/defaultsDeep'
import defaultConfig from './default'

export default defaultsDeep({
  printingEngineBaseUrl: 'https://printing-engine.all3dp.com/v1',
  stripePublicKey: 'pk_test_vgy9WdRy48FnhegkMYXMQXit',  // Key for the test System
  googleMapsApiKey: 'AIzaSyC_f-WiODvaWW-Hw5T9RZRSKkvLcy9WCGU'
}, defaultConfig)
