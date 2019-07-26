import config from '../../../config'

const stripe = window.Stripe(config.stripePublicKey)

export const {redirectToCheckout} = stripe
