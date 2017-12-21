import {getCountryName} from '../service/country'
import {formatCurrency} from '../service/currency'

export function formatPrice(value, currency, estimated = false) {
  return `${estimated ? '~' : ''}${formatCurrency(value.toFixed(2), currency)}`
}

export function formatDeliveryTime(deliveryTime) {
  if (String(deliveryTime) === '1') {
    return '1 day'
  }
  return `${deliveryTime} days`
}

export function formatShipping(shipping) {
  return `${shipping.name} (${formatDeliveryTime(shipping.deliveryTime)})`
}

export function formatAddress(address) {
  if (address.city && address.countryCode) {
    return `${address.city}, ${getCountryName(address.countryCode)}`
  }

  return ''
}

export function formatDimensions({x, y, z}, unit) {
  if (!x && !y && !z) return null

  // Round to at most 2 decimal places but drop 0s
  const round = n => +(Math.round(n * 100) / 100)
  const zStr = z !== undefined ? ` × ${round(z)}` : ''

  return `${round(x)} × ${round(y)}${zStr} ${unit}`
}
