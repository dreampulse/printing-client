import defaultsDeep from 'lodash/defaultsDeep'
import defaultConfig from './default'

export default defaultsDeep({
  printingEngineBaseUrl: 'https://printing-engine.all3dp.com/v1',
  stripePublicKey: 'pk_live_4OJl78TMOSPW8HHxzml8Xfr5',
  paypal: {
    locale: 'en_US',
    env: 'production',
    client: {
      production: 'AbvitbyqkRJcWOjzsxRH-W__HaSJcbweV96ifdHOonh94toIyopK8hlPUmrkJmArWuR0f4ggKMpzRgZP'
    }
  },
  googleMapsApiKey: 'AIzaSyC_f-WiODvaWW-Hw5T9RZRSKkvLcy9WCGU'
}, defaultConfig)
