import React, { Component } from 'react'

class PaypalButton extends Component {

  render () {
    return (
      <div id="paypal-button"></div>
    )
  }

  componentDidMount () {
    const option = {
      env: 'sandbox', // Specify 'production' for the production environment
      locale: 'en_US',
      style: {
        size: 'small',
        color: 'gold',
        shape: 'pill'
      },
      payment: this.payment.bind(this),
      onAuthorize: this.onAuthorize.bind(this),
      onCancel: this.onCancel.bind(this)
    }
    global.paypal.Button.render(option, '#paypal-button')
  }

  payment () {
    // Set up the payment here, when the buyer clicks on the button
  }

  onAuthorize (data, actions) {
    // Execute the payment here, when the buyer approves the transaction
  }

  onCancel (data, actions) {

  }

}

export default PaypalButton
