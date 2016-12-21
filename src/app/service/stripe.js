import config from '../config'

export function checkout ({amount, currency, email}) {
  return new Promise(resolve => {
    const checkoutHandler = global.StripeCheckout.configure({
      key: config.stripePublicKey,
      // image: config.stripePublicKey,
      name: 'All3DP',
      bitcoin: true,
      token: (token) => resolve(token)
    })

    checkoutHandler.open({
      name: 'All3DP',
      description: 'Printing Engine Client',
      amount: amount * 100,
      currency,
      email
    })
  })
}
