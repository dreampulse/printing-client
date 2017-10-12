import {getCountryName} from 'Service/country'

const CURRENCY_SYMBOL = {
  EUR: '€',
  USD: '$'
}

export function formatCurrency (currency) {
  const symbol = CURRENCY_SYMBOL[currency]
  if (!symbol) {
    throw new Error(`There is no preconfigured symbol for given currency ${currency}!`)
  }
  return symbol
}

export function formatPrice (value, currency, estimated = false) {
  return `${estimated ? '~' : ''}${value.toFixed(2)} ${formatCurrency(currency)}`
}

export function formatDeliveryTime (deliveryTime) {
  if (String(deliveryTime) === '1') {
    return '1 day'
  }
  return `${deliveryTime} days`
}

export function formatShipping (shipping) {
  return `${shipping.displayName || shipping.name} (${formatDeliveryTime(shipping.deliveryTime)})`
}

export function formatAddress (address) {
  if (address.city && address.countryCode) {
    return `${address.city}, ${getCountryName(address.countryCode)}`
  }

  return ''
}

export function formatDimensions ({x, y, z}, unit) {
  // Round to at most 2 decimal places but drop 0s
  const round = n => +(Math.round(n * 100) / 100)
  const zStr = z !== undefined ? ` × ${round(z)}` : ''

  return `${round(x)} × ${round(y)}${zStr} ${unit}`
}
