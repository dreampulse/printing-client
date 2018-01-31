import {getCountryName} from '../service/country'
import config from '../../../config'

export function formatPrice(value, currency) {
  const supportedCurrency = config.currencies.find(c => c.value === currency)
  if (supportedCurrency && supportedCurrency.prefix) {
    return `${supportedCurrency.symbol}${value.toFixed(2)}`
  } else if (supportedCurrency && !supportedCurrency.prefix) {
    return `${value.toFixed(2)}${supportedCurrency.symbol}`
  }
  return `${currency}${value.toFixed(2)}`
}

export function formatDeliveryTime(deliveryTime) {
  if (String(deliveryTime) === '1') {
    return '1 day'
  }
  return `${deliveryTime} days`
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
