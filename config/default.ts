export default {
  pollingRetries: 200,
  pollingInterval: 1000,
  imagePollingInterval: 1500,
  receiveQuotesWait: 2000,
  cloudinaryUrl: '//res.cloudinary.com/all3dp/image/upload',
  landingPageUrl: '//craftcloud.all3dp.com',
  cloudinaryDefaultParams: ['q_90', 'f_auto'],
  stripeCheckoutImage: 'asset/image/checkout-logo.png',
  stripeDescription: '3D Printing Service',
  stripeName: 'Craftcloud by All3DP',
  ravenUrl: 'https://ea87ef20371a4316aca7c9f415aad1f9@sentry.io/193367',
  ravenRelease: process.env.SENTRY_RELEASE_VERSION,
  countryCookie: 'country',
  supportContactUrl: '//craftcloud.all3dp.com/contact',
  currencies: [
    {value: 'USD', label: 'USD', symbol: '$', prefix: true},
    {value: 'EUR', label: 'EUR', symbol: '€', prefix: false},
    {value: 'GBP', label: 'GBP', symbol: '£', prefix: true},
    {value: 'CAD', label: 'CAD', symbol: 'CDN$', prefix: true},
    {value: 'AUD', label: 'AUD', symbol: 'AU$', prefix: true}
  ],
  defaultCurrency: 'USD',
  providerNames: {
    autotiv: 'Autotiv MFG',
    facfox: 'FacFox',
    harp: 'Harp Concepts',
    imaterialise: 'i.Materialise',
    jawstec: 'JawsTec',
    sculpteo: 'Sculpteo',
    shapeways: 'Shapeways',
    simply3d: 'Simply 3D',
    treatstock: 'Treatstock',
    zverse: 'ZVerse'
  },
  euCountries: [
    'BE',
    'BG',
    'CZ',
    'DK',
    'DE',
    'EE',
    'IE',
    'EL',
    'ES',
    'FR',
    'HR',
    'IT',
    'CY',
    'LV',
    'LT',
    'LU',
    'HU',
    'MT',
    'NL',
    'AT',
    'PL',
    'PT',
    'RO',
    'SI',
    'SK',
    'FI',
    'SE',
    'UK',
    'GB'
  ],
  localStorageAddressKey: 'address_v3',
  printingEngineBaseUrl: 'http://localhost:8000',
  stripePublicKey: 'pk_test_vgy9WdRy48FnhegkMYXMQXit',
  localStorageCoreSessionKey: 'core_session_v1'
}
