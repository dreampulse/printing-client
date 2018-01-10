// @flow

import {request} from '../service/http'
import timeout from './timeout'
import config from '../../../config'

import type {Location, Address, GoogleMapsPlace} from '../type-next'

const URL = `https://pro.ip-api.com/json/?key=${config.ipApiKey}`

const findInGoogleMapsPlace = (property: string) => (
  place: GoogleMapsPlace,
  type: string
): string => {
  const addressComponents = place.address_components
  if (!addressComponents) return ''
  const component = addressComponents.find(c => c.types.find(t => t === type))
  if (!component) return ''
  return component[property] || ''
}

const shortNameFrom = findInGoogleMapsPlace('short_name')
const longNameFrom = findInGoogleMapsPlace('long_name')

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

export const convertPlaceToLocation = (place: GoogleMapsPlace): Location => ({
  houseNumber: shortNameFrom(place, 'street_number'),
  street: longNameFrom(place, 'route'),
  city: longNameFrom(place, 'locality'),
  zipCode: shortNameFrom(place, 'postal_code'),
  stateCode: shortNameFrom(place, 'administrative_area_level_1'),
  countryCode: shortNameFrom(place, 'country')
})

export const isAddressValid = (address: Address) => address.countryCode
