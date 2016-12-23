import React, { Component } from 'react'
import config from '../config'
import getTotalAmount from '../util/get-total-amount'

const paypal = global.paypal

class PaypalButton extends Component {

  render () {
    return (
      <div id="paypal-button"></div>
    )
  }

  componentDidMount () {
    const { onPayment, onAuthorize, onError, onCancel } = this.props

    const options = {
      ...config.paypal,
      commit: true, // show 'Pay Now' button during checkout
      style: { size: 'small', color: 'gold', shape: 'pill' },
      onError,
      onCancel,
      payment: onPayment,
      async onAuthorize (data, actions) {
        await actions.payment.execute()
        const payment = await actions.payment.get()
        return onAuthorize(payment)
      }
    }

    paypal.Button.render(options, '#paypal-button')
  }

}

export default PaypalButton
