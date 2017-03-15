export function getCartAmount (cart) {
  // issue: find matching items
  const itemPrice = cart.items.reduce((last, cur) => last + cur.price * cur.quantity, 0)
  const shippingPrice = cart.shipping.reduce((last, cur) => last + cur.price, 0)
  return Math.round((itemPrice + shippingPrice) * (cart.vatPercentage + 1) * 100) / 100
}

export function getOfferAmount (offer) {
  const itemPrice = offer.items.reduce((last, cur) => last + cur.quantity * cur.price, 0)
  const shippingPrice = offer.shipping.price
  return (itemPrice + shippingPrice) * (offer.vatPercentage + 1)
}
