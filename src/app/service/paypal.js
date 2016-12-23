import config from '../config'

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
