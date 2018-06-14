import defaultsDeep from 'lodash/defaultsDeep'
import defaultConfig from './default'

export default defaultsDeep(
  {
    printingEngineBaseUrl: 'http://localhost:8000',
    stripePublicKey: 'pk_test_vgy9WdRy48FnhegkMYXMQXit',
    paypal: {
      locale: 'en_US',
      env: 'sandbox',
      client: {
        sandbox: 'AXOhxV6hHM2koGQdbXKcsalRyHtehlcGRDM82RIcb9u1LIIH2XskwgeN2ZeDuIY0qlVh9R8s8Zag9bgK'
      }
    },
    googleMapsApiKey: 'AIzaSyBhZh8C1bG-jR_x6izJexGqNCyHhaPGeyo'
  },
  defaultConfig
)
