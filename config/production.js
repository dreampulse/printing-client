import defaultsDeep from 'lodash/defaultsDeep'
import defaultConfig from './default'

export default defaultsDeep({
  printingEngineBaseUrl: 'https://printing-engine.all3dp.com/v1',
  stripePublicKey: 'pk_live_4OJl78TMOSPW8HHxzml8Xfr5',
  googleMapsApiKey: 'AIzaSyC_f-WiODvaWW-Hw5T9RZRSKkvLcy9WCGU'
}, defaultConfig)
