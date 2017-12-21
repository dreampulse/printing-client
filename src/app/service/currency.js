const currencies = [
  {value: 'USD', label: 'USD'},
  {value: 'EUR', label: 'EUR'},
  {value: 'GBP', label: 'GBP'},
  {value: 'CAD', label: 'CAD'},
  {value: 'AUD', label: 'AUD'}
]

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$'
}

export function getCurrencies() {
  return currencies
}

export function formatCurrency(value, currency) {
  const symbol = currencySymbols[currency] || currency
  return `${symbol}${value}`
}
