import config from '../../../config'

export function checkout ({amount, currency, email}) {
  return new Promise((resolve, reject) => {
    const checkoutHandler = global.StripeCheckout.configure({
      key: config.stripePublicKey,
      image: config.stripCheckoutImage,
      name: 'All3DP',
      bitcoin: false,
      token: token => resolve(token),
      closed: () => reject(new Error('Payment aborted by user.'))
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
