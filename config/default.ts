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
    {value: 'USD', label: 'USD', symbol: '$'},
    {value: 'EUR', label: 'EUR', symbol: '€'},
    {value: 'GBP', label: 'GBP', symbol: '£'},
    {value: 'CAD', label: 'CAD', symbol: 'CDN$'},
    {value: 'AUD', label: 'AUD', symbol: 'AU$'}
  ],
  defaultCurrency: 'USD',
  providers: [
    {
      vendorId: 'autotiv',
      name: 'Autotiv MFG',
      description: 'lorem ipsum'
    },
    {
      vendorId: 'facfox',
      name: 'FacFox',
      description: 'lorem ipsum'
    },
    {
      vendorId: 'harp',
      name: 'Harp Concepts',
      description: 'lorem ipsum'
    },
    {
      vendorId: 'imaterialise',
      name: 'i.Materialise',
      description: 'lorem ipsum'
    },
    {
      vendorId: 'jawstec',
      name: 'JawsTec',
      description: 'lorem ipsum'
    },
    {
      vendorId: 'sculpteo',
      name: 'Sculpteo',
      description: 'lorem ipsum'
    },
    {
      vendorId: 'shapeways',
      name: 'Shapeways',
      description: 'lorem ipsum'
    },
    {
      vendorId: 'simply3d',
      name: 'Simply 3D',
      description: 'lorem ipsum'
    },
    {
      vendorId: 'treatstock',
      name: 'Treatstock',
      description: 'lorem ipsum'
    },
    {
      vendorId: 'wenext',
      name: 'WeNext',
      description: 'lorem ipsum'
    },
    {
      vendorId: 'zelta3d',
      name: 'Zelta 3D',
      description: 'lorem ipsum'
    },
    {
      vendorId: 'zverse',
      name: 'ZVerse',
      description: 'lorem ipsum'
    }
  ],
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
  localStorageSessionKey: 'session_v1',
  localStorageSessionLiveTime: 30 * 60
}
