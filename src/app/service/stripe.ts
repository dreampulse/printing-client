import config from '../../../config'

import {PaymentAbortedError} from '../lib/error'

export function checkout({
  price,
  currency,
  email
}: {
  price: number
  currency: string
  email: string
}) {
  return new Promise((resolve, reject) => {
    const checkoutHandler = window.StripeCheckout.configure({
      key: config.stripePublicKey,
      image: config.stripeCheckoutImage,
      name: config.stripeName,
      bitcoin: false,
      token: (token: string) => resolve(token),
      closed: () => reject(new PaymentAbortedError())
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
