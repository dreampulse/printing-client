import React, {Component, PropTypes} from 'react'

import propTypes from 'Lib/prop-types'
import config from '../../../config'

class PaypalButton extends Component {

  componentDidMount () {
    const {payment, onAuthorize, onCancel, onError} = this.props

    const options = {
      ...config.paypal,
      payment,
      onAuthorize,
      onCancel,
      onError,
      commit: true, // show 'Pay Now' button during checkout
      style: {size: 'responsive', color: 'gold', shape: 'rect'}
    }

    global.paypal.Button.render(options, this.paypalButton)
  }

  render () {
    return (
      <div ref={(div) => { this.paypalButton = div }} />
    )
  }

}

PaypalButton.propTypes = {
  ...propTypes.component,
  payment: PropTypes.func,
  onAuthorize: PropTypes.func,
  onCancel: PropTypes.func,
  onError: PropTypes.func
}

export default PaypalButton
