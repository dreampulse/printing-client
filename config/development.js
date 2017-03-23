import defaultsDeep from 'lodash/defaultsDeep'
import defaultConfig from './default'

export default defaultsDeep({
  printingEngineBaseUrl: 'http://localhost:8000/v1',
  stripePublicKey: 'pk_test_vgy9WdRy48FnhegkMYXMQXit',
  paypal: {
    locale: 'en_US',
    env: 'sandbox', // Specify 'production' for the production environment
    client: {
      sandbox: 'AVNqaTFWs0Rbq3tKKF7kJN_D3vlAAmbpv9XnFtajnokdINqj-TLLXpc8JqfpIygjqs0Du6dBYYQR48T9'
    }
  },
  googleMapsApiKey: 'AIzaSyBhZh8C1bG-jR_x6izJexGqNCyHhaPGeyo'
}, defaultConfig)
