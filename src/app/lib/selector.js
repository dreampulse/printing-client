
export const selectCartItems = state =>
  state.cart.cart.items.map(cartItem => ({
    ...cartItem,
    ...state.model.models[cartItem.modelId]
  }))

export const selectCart = (state) => {
  // TODO: should be calculated at the server: https://github.com/all3dp/printing-engine/issues/66
  // This is only a temporaty solution
  const cartItems = selectCartItems(state)
  const cart = state.cart.cart

  const subTotal = () =>
    cartItems.reduce((acc, cartItem) => acc + (cartItem.price * cartItem.quantity), 0)

  const shippingTotal = () =>
    cart.shipping.reduce((acc, shipping) => acc + shipping.price, 0)

  const vatTotal = () =>
    Math.round(((subTotal() + shippingTotal()) * cart.vatPercentage) * 100) / 100

  const totalPrice = () =>
    subTotal() + shippingTotal() + vatTotal()

  return {
    ...cart,
    subTotal: subTotal(),
    shippingTotal: shippingTotal(),
    vatTotal: vatTotal(),
    totalPrice: totalPrice()
  }
}
