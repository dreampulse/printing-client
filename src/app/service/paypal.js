import config from '../../../config'

const paypal = global.paypal

export function createPayment ({ amount, currency, cartId }) {
  const env = config.paypal.env
  const client = config.paypal.client
  const transactions = [{
    custom: cartId,
    amount: {
      total: String(amount),
      currency
    }
  }]
  return paypal.rest.payment.create(env, client, { transactions })
}

export async function executePayment ({ actions }) {
  await actions.payment.execute()
  const payment = await actions.payment.get()
  if (payment.state !== 'approved') throw new Error('PayPal payment not approved')
  return payment
}
