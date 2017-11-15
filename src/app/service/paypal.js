import config from '../../../config'
import {requestJson} from './http'

const PAYMENT_ENDPOINT = `${config.printingEngineBaseUrl}/payment/paypal`

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

  return requestJson(PAYMENT_ENDPOINT, {method: 'POST', body: {orderId: offerId, transactions}})
}

export async function executePayment({data, paymentId}) {
  if (!data.paymentID) throw new Error('Payment failed')

  const payment = await requestJson(`${PAYMENT_ENDPOINT}/${paymentId}`, {
    method: 'PUT',
    body: {payerId: data.payerID}
  })
  if (!payment.status) throw new Error('PayPal payment not approved')
  return payment
}
