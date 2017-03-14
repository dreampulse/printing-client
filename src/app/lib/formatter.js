export function formatPrice (value, currency) {
  return `${value.toFixed(2)} ${currency}`
}

export function formatShipping ({deliveryTime}) {
  if (String(deliveryTime) === '1') {
    return '1 day'
  }
  return `${deliveryTime} days`
}
