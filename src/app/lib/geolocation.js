// @flow

import {request} from 'Service/http'
import timeout from './timeout'
import config from '../../../config'

import type {Location, Address, GoogleMapsPlace} from '../type-next'

const URL = `https://pro.ip-api.com/json/?key=${config.ipApiKey}`

export const getLocationByIp = async (): Promise<Location> => {
  const {city, zip, region, countryCode} = await timeout(request(URL), config.fetchTimout)

  if (!countryCode) {
    throw new Error('Location detection failed')
  }

  // Returns the object as we need it
  return {
    city,
    zipCode: zip,
    stateCode: region,
    countryCode
  }
}

export const convertPlaceToLocation = (place: GoogleMapsPlace): string | Location => {
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

export const isAddressValid = (address: Address) => address.countryCode
