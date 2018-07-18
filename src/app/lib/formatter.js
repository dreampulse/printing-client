import {getCountryName} from '../service/country'
import config from '../../../config'

export function formatPrice(value, currency) {
  const formattedValue = value.toFixed(2)
  const supportedCurrency = config.currencies.find(c => c.value === currency)
  const prefix = supportedCurrency ? supportedCurrency.prefix : true
  const symbol = supportedCurrency ? supportedCurrency.symbol : currency

  return prefix ? `${symbol}${formattedValue}` : `${formattedValue}${symbol}`
}

function appendDays(n) {
  return Number(n) === 1 ? 'day' : 'days'
}

export function formatDeliveryTime(deliveryTime) {
  return `${deliveryTime} ${appendDays(deliveryTime)}`
}

export function formatTimeRange(from, to) {
  const nFrom = Number(from)
  const nTo = Number(to)
  const diff = nTo - nFrom

  if (diff === 0) return formatTimeRange(nFrom)
  if (diff < 0) return formatTimeRange(nTo, nFrom)
  if (nFrom && nTo) return `${from}-${to} ${appendDays(to)}`
  if (nFrom) return `${from} ${appendDays(from)}`
  return '–'
}

export function formatAddress(address) {
  if (address && address.city && address.countryCode) {
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
