// @flow

import {request} from '../service/http'
import timeout from './timeout'
import config from '../../../config'

import type {Location, GoogleMapsPlace} from '../type'

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

const getStateCodeShortNameFrom = (place: GoogleMapsPlace): string =>
  shortNameFrom(
    place,
    shortNameFrom(place, 'country') === 'GB'
      ? 'administrative_area_level_2'
      : 'administrative_area_level_1'
  )

export const convertPlaceToLocation = (place: GoogleMapsPlace): Location => ({
  city: longNameFrom(place, 'locality'),
  zipCode: shortNameFrom(place, 'postal_code'),
  stateCode: getStateCodeShortNameFrom(place),
  countryCode: shortNameFrom(place, 'country')
})

export const isLocationValid = (location: ?Location) => Boolean(location && location.countryCode)
