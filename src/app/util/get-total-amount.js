export default function getTotalAmount ({ cart }) {
  const itemPrice = cart.items.reduce((last, cur) => last + cur.price * cur.quantity, 0)
  const shippingPrice = cart.shipping.reduce((last, cur) => last + cur.price, 0)
  return Math.round((itemPrice + shippingPrice) * cart.vatPercentage * 100) / 100
}
