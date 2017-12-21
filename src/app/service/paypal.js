// TODO: this should not be a service, put in lib and write tests!

import * as printingEngine from './printing-engine'

export function createPayment({
  amount,
  currency,
  vat,
  subTotal,
  shipping,
  orderId,
  orderNumber,
  shippingAddress
}) {
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
        currency,
        details: {
          subtotal: String(subTotal),
          tax: String(vat),
          shipping: String(shipping)
        }
      },
      item_list: {
        items: [
          {
            quantity: 1,
            currency,
            name: `Order Number: ${orderNumber}`,
            price: subTotal
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

  return printingEngine.createPaypalPayment({orderId, transactions})
}

export async function executePayment({data, paymentId}) {
  if (!data.paymentID) throw new Error('Payment failed')

  const payment = await printingEngine.executePaypalPayment({
    payerId: data.payerID,
    paymentId
  })

  if (!payment.status) throw new Error('PayPal payment not approved')
  return payment
}
