import config from '../../../config'

export const redirectToCheckout = ({sessionId}: {sessionId: string}) => {
  const stripe = window.Stripe(config.stripePublicKey)
  return stripe.redirectToCheckout({sessionId})
}
