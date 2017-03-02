import * as geolocation from '../src/app/service/geolocation'

geolocation.getLocation = () =>
  Promise.resolve({
    city: 'Munich',
    zipCode: '80333',
    stateCode: 'BY',
    countryCode: 'DE'
  })
