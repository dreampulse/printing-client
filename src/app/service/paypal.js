import config from '../../../config'
import {requestJson} from './http'

const PAYMENT_ENDPOINT = `${config.printingEngineBaseUrl}/payment/paypal`

export function createPayment({amount, currency, orderId, shippingAddress}) {
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
      custom: orderId,
      amount: {
        total: String(amount),
        currency
      },
      item_list: {
        items: [
          {
            quantity: 1,
            name: '3D Printed Item',
            price: String(amount),
            currency,
            tax: 0
          }
        ],
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

  return requestJson(PAYMENT_ENDPOINT, {method: 'POST', body: {orderId, transactions}})
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
