export default {
  pollingRetries: 200,
  pollingInterval: 1000,
  pollingDebouncedWait: 2000,
  fetchTimout: 3000,
  imagePollingInterval: 1500,
  cloudinaryUrl: '//res.cloudinary.com/all3dp/image/upload',
  cloudinaryDefaultParams: ['q_90', 'f_auto'],
  stripeCheckoutImage: 'asset/image/checkout-logo.png',
  stripeDescription: '3D Printing Service',
  stripeName: 'Craftcloud by All3DP',
  ravenUrl: 'https://ea87ef20371a4316aca7c9f415aad1f9@sentry.io/193367',
  ravenRelease: process.env.SENTRY_RELEASE_VERSION,
  countryCookie: 'country',
  currencies: [
    {value: 'USD', label: 'USD', symbol: '$', prefix: true},
    {value: 'EUR', label: 'EUR', symbol: '€', prefix: false},
    {value: 'GBP', label: 'GBP', symbol: '£', prefix: true},
    {value: 'CAD', label: 'CAD', symbol: 'CDN$', prefix: true},
    {value: 'AUD', label: 'AUD', symbol: 'AU$', prefix: true}
  ],
  defaultCurrency: 'USD',
  providerNames: {
    facfox: 'FacFox',
    imaterialise: 'i.Materialise',
    jawstec: 'JawsTec',
    sculpteo: 'Sculpteo',
    shapeways: 'Shapeways',
    trinckle: 'Trinckle',
    treatstock: 'Treatstock'
  },
  localStorageAddressKey: 'address_v2',
  printingEngineBaseUrl: 'http://localhost:8000',
  stripePublicKey: 'pk_test_vgy9WdRy48FnhegkMYXMQXit'
}
