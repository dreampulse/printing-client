import defaultsDeep from 'lodash/defaultsDeep'
import defaultConfig from './default'

export default defaultsDeep(
  {
    printingEngineBaseUrl: 'https://printing-engine-stage.all3dp.com',
    stripePublicKey: 'pk_live_4OJl78TMOSPW8HHxzml8Xfr5',
    paypal: {
      locale: 'en_US',
      env: 'production',
      client: {
        production:
          'AQUzybuwq7Qi8ODVhPF0RmcEb05kqon2tO058IRVgQUkaekWt5JXOXtc98mvLEx1XTZEhLw90zgVMvs6'
      }
    },
    googleMapsApiKey: 'AIzaSyC_f-WiODvaWW-Hw5T9RZRSKkvLcy9WCGU'
  },
  defaultConfig
)
