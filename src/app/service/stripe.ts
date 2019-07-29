import config from '../../../config'

const stripe = window.Stripe('pk_test_vgy9WdRy48FnhegkMYXMQXit')

export const {redirectToCheckout} = stripe
