import React, {Component, PropTypes} from 'react'

import config from '../../../config'

class PaypalButton extends Component {
  componentDidMount () {
    const {onClick, onAuthorize, onCancel, onError} = this.props

    const options = {
      ...config.paypal,
      payment: onClick,
      onAuthorize,
      onCancel,
      onError,
      commit: true,  // Show 'Pay Now' button during checkout
      style: {size: 'responsive', color: 'gold', shape: 'rect'}
    }

    global.paypal.Button.render(options, this.paypalButton)
  }

  render () {
    return (
      <div ref={(el) => { this.paypalButton = el }} />
    )
  }
}

PaypalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  onAuthorize: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onError: PropTypes.func
}

export default PaypalButton
