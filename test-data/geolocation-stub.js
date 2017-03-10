import * as geolocation from '../src/app/lib/geolocation'
console.log('geolocation', geolocation)

geolocation.getLocation = () =>
  Promise.reject({
    city: 'Munich',
    zipCode: '80333',
    stateCode: 'BY',
    countryCode: 'DE'
  })
