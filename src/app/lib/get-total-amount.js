export function getCartAmount (cart) {
  const itemPrice = cart.items.reduce((last, cur) => last + cur.price * cur.quantity, 0)
  const shippingPrice = cart.shipping.reduce((last, cur) => last + cur.price, 0)
  return Math.round((itemPrice + shippingPrice) * (cart.vatPercentage + 1) * 100) / 100
}

export function getPriceAmount (vendor) {
  const itemPrice = vendor.items.reduce((last, cur) => last + cur.price, 0)
  const shippingPrice = Math.min(...vendor.shipping.map(s => s.price))
  return Math.round((itemPrice + shippingPrice) * (vendor.vatPercentage + 1) * 100) / 100
}
