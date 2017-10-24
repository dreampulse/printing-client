import {request} from 'Service/http'
import timeout from './timeout'
import config from '../../../config'

const URL = `https://pro.ip-api.com/json/?key=${config.ipApiKey}`

export const getLocationByIp = async () => {
  const {city, zip, region, countryCode} = await timeout(request(URL), config.fetchTimout)

  if (!countryCode) {
    throw new Error('Location detection failed')
  }

  return {
    city,
    zipCode: zip,
    stateCode: region,
    countryCode
  }
}

export const convertPlaceToLocation = place => {
  const findType = query => {
    const addressComponents = place.address_components
    if (!addressComponents) return ''
    const components = addressComponents.filter(c => c.types.find(t => t === query))
    if (components.length > 0) return components[0].short_name
    return ''
  }

  return {
    houseNumber: findType('street_number'),
    street: findType('route'),
    city: findType('locality'),
    zipCode: findType('postal_code'),
    stateCode: findType('administrative_area_level_1'),
    countryCode: findType('country')
  }
}

export const isAddressValid = address => address.countryCode
