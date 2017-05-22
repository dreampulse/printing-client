import config from '../../../config'

export const paypal = global.paypal

export function createPayment ({amount, currency, offerId}) {
  const env = config.paypal.env
  const client = config.paypal.client
  const transactions = [{
    custom: offerId,
    amount: {
      total: String(amount),
      currency
    }
  }]
  return paypal.rest.payment.create(env, client, {transactions})
}

export async function executePayment ({actions}) {
  await actions.payment.execute()
  const payment = await actions.payment.get()
  if (payment.state !== 'approved') throw new Error('PayPal payment not approved')
  return payment
}
