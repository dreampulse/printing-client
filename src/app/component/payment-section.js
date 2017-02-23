import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const PaymentSection = ({classNames, modifiers, children, subtotal, shipping, vat, total}) => (
  <section className={buildClassName('payment-section', modifiers, classNames)}>
    <ul className="payment-section__price-components">
      <li className="payment-section__price-component">
        <span className="payment-section__price-label">Subtotal:</span>
        <span className="payment-section__price-value">{subtotal}</span>
      </li>
      <li className="payment-section__price-component">
        <span className="payment-section__price-label">Shipping:</span>
        <span className="payment-section__price-value">{shipping}</span>
      </li>
      <li className="payment-section__price-component">
        <span className="payment-section__price-label">VAT:</span>
        <span className="payment-section__price-value">{vat}</span>
      </li>
      <li className="payment-section__total-price">
        <span className="payment-section__price-label">Total:</span>
        <span className="payment-section__price-value">{total}</span>
      </li>
    </ul>
    <ul className="payment-section__buttons">
      {
        React.Children.map(children, child => (
          <li key={child.key} className="payment-section__button">
            {child}
          </li>
        ))
      }
    </ul>
  </section>
)

PaymentSection.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  subtotal: PropTypes.string.isRequired,
  shipping: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired
}

export default PaymentSection
