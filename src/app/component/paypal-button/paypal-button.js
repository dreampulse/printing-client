import PropTypes from 'prop-types'
import React, {Component} from 'react'

import config from '../../../../config'

const BUTTON_HEIGHT = 50

class PaypalButton extends Component {
  componentDidMount() {
    const {onClick, onAuthorize, onCancel, onError} = this.props

    const options = {
      ...config.paypal,
      payment: onClick,
      onAuthorize,
      onCancel,
      onError,
      commit: true, // Show 'Pay Now' button during checkout
      style: {
        size: 'responsive',
        color: 'gold',
        shape: 'rect',
        tagline: 'false',
        height: BUTTON_HEIGHT
      }
    }
    global.paypal && global.paypal.Button && global.paypal.Button.render(options, this.paypalButton)
  }

  render() {
    return (
      <div
        style={{
          pointerEvents: this.props.disabled ? 'none' : 'auto',
          opacity: this.props.disabled ? 0.5 : 1,
          height: BUTTON_HEIGHT,
          overflow: 'hidden'
        }}
        ref={el => {
          this.paypalButton = el
        }}
      />
    )
  }
}

PaypalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  onAuthorize: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onError: PropTypes.func,
  disabled: PropTypes.bool
}

export default PaypalButton
