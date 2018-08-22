// @flow

import * as printingEngine from '../lib/printing-engine'
import * as stripe from '../service/stripe'
import type {UserId, CartId, UtmParams} from '../type-next'

type PayWithPaypalParams = {
  userId: UserId,
  cartId: CartId,
  currency: string,
  utmParams?: UtmParams
}

export const payWithPaypal = async ({userId, cartId, currency, utmParams}: PayWithPaypalParams) => {
  const {orderId, orderNumber} = await printingEngine.createOrder({
    userId,
    cartId,
    currency,
    utmParams
  })
  const {paymentId, providerFields} = await printingEngine.createPaypalPayment({orderId})

  return {
    orderId,
    orderNumber,
    paymentId,
    paymentToken: providerFields.paymentId
  }
}

type PayWithStripeParams = {
  userId: UserId,
  cartId: CartId,
  currency: string,
  email: string,
  price: number,
  utmParams?: UtmParams
}

export const payWithStripe = async ({
  userId,
  cartId,
  currency,
  email,
  price,
  utmParams
}: PayWithStripeParams) => {
  const {orderId, orderNumber} = await printingEngine.createOrder({
    userId,
    cartId,
    currency,
    utmParams
  })
  const stripeTokenObject = await stripe.checkout({price, currency, email})
  const token = stripeTokenObject.id

  await printingEngine.createStripePayment({orderId, token})

  return {
    orderId,
    orderNumber
  }
}

type PayWithInvoiceParams = {
  userId: UserId,
  cartId: CartId,
  currency: string,
  invoiceKey: string,
  utmParams?: UtmParams
}

export const payWithInvoice = async ({
  userId,
  cartId,
  currency,
  invoiceKey,
  utmParams
}: PayWithInvoiceParams) => {
  const {orderId, orderNumber} = await printingEngine.createOrder({
    userId,
    cartId,
    currency,
    utmParams
  })
  await printingEngine.createInvoicePayment({orderId, token: invoiceKey})

  return {
    orderId,
    orderNumber
  }
}
