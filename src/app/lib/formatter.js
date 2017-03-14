export function formatPrice (value, currency) {
  return `${value.toFixed(2)} ${currency}`
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
