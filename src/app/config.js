export default {
  printingEngineBaseUrl: 'https://printing-engine.all3dp.com/v1',
  // printingEngineBaseUrl: 'http://localhost:8000/v1',
  pollingRetries: 100,
  pollingInvervall: 1000,
  stripePublicKey: 'pk_test_vgy9WdRy48FnhegkMYXMQXit',
  paypal: {
    locale: 'en_US',
    env: 'sandbox', // Specify 'production' for the production environment
    client: {
      sandbox: 'AVNqaTFWs0Rbq3tKKF7kJN_D3vlAAmbpv9XnFtajnokdINqj-TLLXpc8JqfpIygjqs0Du6dBYYQR48T9'
    }
  }
}
