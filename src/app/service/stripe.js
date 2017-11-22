import config from '../../../config'
import {requestJson} from './http'

const baseUrl = config.printingEngineBaseUrl

export function checkout({amount, currency, email}) {
  return new Promise((resolve, reject) => {
    const checkoutHandler = global.StripeCheckout.configure({
      key: config.stripePublicKey,
      image: config.stripeCheckoutImage,
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

export function executePayment({orderId, token}) {
  return requestJson(`${baseUrl}/payment/stripe`, {
    method: 'POST',
    body: {
      orderId,
      token
    }
  })
}
