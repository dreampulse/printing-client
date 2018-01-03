import config from '../../../config'

export function getCurrencies() {
  return config.currencies.map(currency => ({
    value: currency.value,
    label: currency.label
  }))
}

export function formatCurrency(value, currencyCode) {
  const currency = config.currencies.find(c => c.value === currencyCode)
  const prefix = currency ? currency.symbol : currencyCode
  return `${prefix}${value}`
}
