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
  return `${shipping.name} (${formatDeliveryTime(shipping.deliveryTime)})`
}

export function formatAddress (address) {
  if (address.city && address.countryCode) {
    return `${address.city}, ${getCountryName(address.countryCode)}`
  }

  return ''
}
