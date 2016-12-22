import React, { Component } from 'react'

import config from '../config'

class PaypalButton extends Component {

  render () {
    return (
      <div id="paypal-button"></div>
    )
  }

  componentDidMount () {
    const options = {
      ...config.paypal,
      commit: true, // Optional: show a 'Pay Now' button in the checkout flow
      style: {
        size: 'small',
        color: 'gold',
        shape: 'pill'
      },
      payment () {
        // Set up the payment here, when the buyer clicks on the button
        const env = this.props.env
        const client = this.props.client
        const options = {
          transactions: [{
            amount: { total: '1.00', currency: 'USD' }
          }]
        }
        return paypal.rest.payment.create(env, client, options)
      },
      async onAuthorize (data, actions) {
        // Execute the payment here, when the buyer approves the transaction
        // Optional: display a confirmation page here

        await actions.payment.execute()

        // Show a success page to the buyer
        alert('Payment authorized')
      },
      onCancel (data, actions) {
        alert('Payment canceled')
      }
    }
    global.paypal.Button.render(options, '#paypal-button')
  }

}

export default PaypalButton
