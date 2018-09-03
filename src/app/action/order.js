// @flow

import type {Action, PaymentId} from '../type'

type PaidActionParams = {orderNumber: string, paymentId: PaymentId}
type PaidAction = Action<'ORDER.PAID', PaidActionParams>
type ExecutePaypalPaymentAction = Action<'ORDER.EXECUTE_PAYPAL_PAYMENT', any>

export type OrderAction = PaidAction | ExecutePaypalPaymentAction

export const paid = ({orderNumber, paymentId}: PaidActionParams): PaidAction => ({
  type: 'ORDER.PAID',
  payload: {orderNumber, paymentId}
})

export const executePaypalPayment = (paypalPaymentData: any): ExecutePaypalPaymentAction => ({
  type: 'ORDER.EXECUTE_PAYPAL_PAYMENT',
  payload: paypalPaymentData
})
