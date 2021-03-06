import config from '../../../config'
import {Location, GoogleMapsPlace} from '../type'
import {getCookie} from '../service/cookie'

const findInGoogleMapsPlace = (property: string) => (
  place: GoogleMapsPlace,
  type: string
): string => {
  const addressComponents = place.address_components
  if (!addressComponents) return ''
  const component = addressComponents.find(c => Boolean(c.types.find(t => t === type)))
  if (!component) return ''
  // TODO update type
  return (component as any)[property] || ''
}

const shortNameFrom = findInGoogleMapsPlace('short_name')
const longNameFrom = findInGoogleMapsPlace('long_name')

export const getLocationFromCookie = (): Location => {
  const countryCode = getCookie(config.countryCookie)

  if (!countryCode) {
    throw new Error('Location detection failed')
  }

  return {
    city: '',
    zipCode: '',
    stateCode: '',
    countryCode: countryCode.toUpperCase()
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

export const isLocationValid = (location?: Location) => Boolean(location && location.countryCode)
