const currencies = [
  {value: 'USD', label: 'USD'},
  {value: 'EUR', label: 'EUR'},
  {value: 'GBP', label: 'GBP'}
]

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£'
}

export function getCurrencies() {
  return currencies
}

export function formatCurrency(value, currency) {
  const symbol = currencySymbols[currency] || currency
  return `${symbol}${value}`
}
