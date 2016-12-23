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
    const { payment, onAuthorize, onCancel, onError } = this.props

    const options = {
      ...config.paypal,
      payment,
      onAuthorize,
      onCancel,
      onError,
      commit: true, // show 'Pay Now' button during checkout
      style: { size: 'small', color: 'gold', shape: 'pill' }
    }

    paypal.Button.render(options, '#paypal-button')
  }

}

export default PaypalButton
