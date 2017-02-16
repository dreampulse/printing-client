import React, {Component, PropTypes} from 'react'
import config from '../../../config'
import {paypal} from '../service/paypal'

class PaypalButton extends Component {

  static propTypes = {
    onPayment: PropTypes.func.isRequired,
    onAuthorize: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    onError: PropTypes.func
  }

  componentDidMount () {
    const {onPayment, onAuthorize, onCancel, onError} = this.props

    const options = {
      ...config.paypal,
      onPayment,
      onAuthorize,
      onCancel,
      onError,
      commit: true, // show 'Pay Now' button during checkout
      style: {size: 'small', color: 'gold', shape: 'pill'}
    }

    if (paypal) {
      paypal.Button.render(options, this.paypalButton)
    }
  }

  render () {
    return (
      <div ref={(div) => { this.paypalButton = div }} />
    )
  }

}

export default PaypalButton
