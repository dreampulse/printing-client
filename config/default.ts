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
      description: 'Autotiv is a manufacturing service based out of Salem, New Hampshire. Autotiv enables mechanical engineers and purchasers to get their custom parts faster and more affordably at quantities 1-100k. Autotiv produces a variety of materials at competitive prices.'
    },
    {
      vendorId: 'facfox',
      name: 'FacFox',
      description: 'Facfox is a Chinese manufacturer with headquarters in Hangzhou and factories in Shenzhen, Dongguan, Suzhou, Changzhou and Wuhan. By choosing Facfox, you will receive industrial grade parts at a very competitive price. Although FacFox are based in China, you as a customer, will never pay additional costs for your parts, all prices via Craftcloud are total prices.'
    },
    {
      vendorId: 'harp',
      name: 'Harp Concepts',
      description: 'Harp Concepts is a manufacturer out of Tucson, Arizona. Specialized in low cost resin printing, Harp Concepts offer a variety of materials at very competitive prices. Affordable 3D printing capabilities to fit any need.'
    },
    {
      vendorId: 'imaterialise',
      name: 'i.Materialise',
      description: 'i.Materialise is one of the leading 3D printing services in the world. Offering every maker, designer, consumer and entrepreneur access to industrial grade machinery and materials at very competitive prices. They provide easy access to their parent company, Materialise, large-scale 3D printing capacity.'
    },
    {
      vendorId: 'jawstec',
      name: 'JawsTec',
      description: 'Jawstec is a manufacturer based out of American Falls, Idaho. With great nylon capabilities, Jawstec offer a great variety of nylon 3D printing materials and finishes. From HP Multi Jet Fusion technology to SLS powder bed printing, Jawstec can produce both small and large quantities with industrial grade end results.'
    },
    {
      vendorId: 'sculpteo',
      name: 'Sculpteo',
      description: 'Sculpteo is a global leader in digital manufacturing based in Paris and San Francisco. The company provides professional 3D printing services for on-demand production of prototypes, individual products as well as short-run manufacturing. Sculpteo provides access to a wide range of materials, finishes, and techniques at very competitive prices.'
    },
    {
      vendorId: 'shapeways',
      name: 'Shapeways',
      description: 'Shapeways is one of the largest manufacturers in the world. Founded in 2007, Shapeways is headquartered in New York City and has factories in Long Island City and the Netherlands. Printing in over 50 materials and finishes, Shapeways provides 3D printing manufacturing solutions to businesses of all sizes across a multitude of industries.'
    },
    {
      vendorId: 'simply3d',
      name: 'Simply 3D',
      description: 'Simply3D is a UK based manufacturer with FDM and SLA capabilities. Due to their competitive prices, you will always receive low cost offers with professional results.'
    },
    {
      vendorId: 'treatstock',
      name: 'Treatstock',
      description: 'Treatstock is a partner network that offer low price quotes for a variety of FDM based materials. Price quotes received from Treatstock are always using region based manufactureres to help lower the prices for your parts.'
    },
    {
      vendorId: 'wenext',
      name: 'WeNext',
      description: 'Wenext is a Chinese manufacturer with more than 100 production partners in the world, serving nearly 130,000 customers, with 1200 models per day. A production capacity and delivery punctuality of more than 98%.By providing a flexible supply chain with clear price, 24-hour delivery and full self-service production for Maker and SME worldwide, Wenext has become the largest Internet manufacturing service platform in Asia-Pacific region. Although WeNext are based in China, you as a customer, will never pay additional costs for your parts, all prices via Craftcloud are total.'
    },
    {
      vendorId: 'zelta3d',
      name: 'Zelta 3D',
      description: 'Zelta3D is a manufacturer based out of Singapore. Zelta3D has the aim of realizing every design given to them and turn them into quality products. With industrial grade machinery and very competitive prices, Zelta3D is a great option for customers looking to produce everything from single piece objects to large batch production. Although Zelta3D are based in Singapore, you as a customer, will never pay additional costs for your parts, all prices via Craftcloud are total.'
    },
    {
      vendorId: 'zverse',
      name: 'ZVerse',
      description: 'Zverse is an American manufacturer, specialized in Carbon specific resin materials. Through Zverse, all of Carbon's materials are available at very competitive prices.'
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
