import {Action, PaymentId} from '../type'

type PaidActionParams = {orderNumber: string; paymentId: PaymentId}

export type PaidAction = Action<'ORDER.PAID', PaidActionParams>
export type ExecutePaypalPaymentAction = Action<'ORDER.EXECUTE_PAYPAL_PAYMENT', any>

export type OrderAction = PaidAction | ExecutePaypalPaymentAction

export const paid = ({orderNumber, paymentId}: PaidActionParams): PaidAction => ({
  type: 'ORDER.PAID',
  payload: {orderNumber, paymentId}
})

export const executePaypalPayment = (paypalPaymentData: any): ExecutePaypalPaymentAction => ({
  type: 'ORDER.EXECUTE_PAYPAL_PAYMENT',
  payload: paypalPaymentData
})
