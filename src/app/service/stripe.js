import config from '../../../config'

export function checkout({price, currency, email}) {
  return new Promise((resolve, reject) => {
    const checkoutHandler = global.StripeCheckout.configure({
      key: config.stripePublicKey,
      image: config.stripeCheckoutImage,
      name: config.stripeName,
      bitcoin: false,
      token: token => resolve(token),
      closed: () => reject(new Error('Payment aborted by user.'))
    })

    checkoutHandler.open({
      name: config.stripeName,
      description: config.stripeDescription,
      amount: price * 100,
      currency,
      email
    })
  })
}
