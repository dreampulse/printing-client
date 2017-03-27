import {getCountryName} from 'Service/country'

export function formatPrice (value, currency, estimated = false) {
  return `${estimated ? '~' : ''}${value.toFixed(2)} ${currency}`
}

export function formatDeliveryTime (deliveryTime) {
  if (String(deliveryTime) === '1') {
    return '1 day'
  }
  return `${deliveryTime} days`
}

export function formatShipping (shipping) {
  return `${shipping.name} (${formatDeliveryTime(shipping.deliveryTime)})`
}

export function formatAddress (address) {
  if (address.city && address.countryCode) {
    return `${address.city}, ${getCountryName(address.countryCode)}`
  }

  return ''
}
