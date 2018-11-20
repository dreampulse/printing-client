import compact from 'lodash/compact'

import {getCountryName} from '../service/country'
import config from '../../../config'
import {Location} from '../type'

export function formatPrice(value: number, currency: string) {
  const formattedValue = value.toFixed(2)
  const supportedCurrency = config.currencies.find(c => c.value === currency)
  const prefix = supportedCurrency ? supportedCurrency.prefix : true
  const symbol = supportedCurrency ? supportedCurrency.symbol : currency

  return prefix ? `${symbol}${formattedValue}` : `${formattedValue}${symbol}`
}

function appendDays(n: number) {
  return Number(n) === 1 ? 'day' : 'days'
}

export function formatDeliveryTime(deliveryTime: number) {
  return `${deliveryTime} ${appendDays(deliveryTime)}`
}

export function formatTimeRange(from: number, to: number): string {
  const nFrom = Number(from)
  const nTo = Number(to)
  const diff = nTo - nFrom

  // TODO: Here is a bug. Intention unclear
  // @ts-ignore
  if (diff === 0) return formatTimeRange(nFrom)
  if (diff < 0) return formatTimeRange(nTo, nFrom)
  if (nFrom && nTo) return `${from}-${to} ${appendDays(to)}`
  if (nFrom) return `${from} ${appendDays(from)}`
  return '–'
}

export const formatLocation = (location: Location) =>
  compact([location.city, location.countryCode && getCountryName(location.countryCode)]).join(', ')

export function formatDimensions({x, y, z}: {x: number, y: number, z: number}, unit: string) {
  if (!x && !y && !z) return null

  // Round to at most 2 decimal places but drop 0s
  const round = (n: number) => +(Math.round(n * 100) / 100)
  const zStr = z !== undefined ? ` × ${round(z)}` : ''

  return `${round(x)} × ${round(y)}${zStr} ${unit}`
}

export const formatTelephoneNumber = (value: string) => value.replace(/\D/g, '')
