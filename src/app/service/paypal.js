import config from '../../../config'
import {requestJson} from './http'

const CREATE_PAYMENT_ENDPOINT = `${config.printingEngineBaseUrl}/paypal/create`
const EXECUTE_PAYMENT_ENDPOINT = `${config.printingEngineBaseUrl}/paypal/execute`

export function createPayment({amount, currency, offerId, shippingAddress}) {
  const {
    firstName,
    lastName,
    street,
    houseNumber,
    addressLine2,
    city,
    zipCode,
    stateCode,
    countryCode
  } = shippingAddress
  const transactions = [
    {
      custom: offerId,
      amount: {
        total: String(amount),
        currency
      },
      item_list: {
        shipping_address: {
          recipient_name: `${firstName} ${lastName}`,
          line1: `${street} ${houseNumber}`,
          line2: addressLine2,
          city,
          country_code: countryCode,
          postal_code: zipCode,
          state: stateCode
        }
      }
    }
  ]

  return requestJson(CREATE_PAYMENT_ENDPOINT, {method: 'POST', body: transactions}).then(
    res => res.paymentId
  )
}

export async function executePayment({data}) {
  if (!data.paymentID) throw new Error('Payment failed')

  const payment = await requestJson(EXECUTE_PAYMENT_ENDPOINT, {
    method: 'POST',
    body: {paymentId: data.paymentID, payerId: data.payerID}
  })
  if (!payment.status) throw new Error('PayPal payment not approved')
  return payment
}
