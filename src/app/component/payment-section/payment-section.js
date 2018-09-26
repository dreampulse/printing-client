import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const PaymentSection = ({
  classNames,
  modifiers,
  children,
  childrenLabel,
  subtotal,
  shippings,
  vat,
  total
}) => (
  <section className={buildClassName('payment-section', modifiers, classNames)}>
    <div className="payment-section__box">
      <ul className="payment-section__price-components">
        <li className="payment-section__price-component">
          <span className="payment-section__price-label">Subtotal:</span>
          <span className="payment-section__price-value">{subtotal}</span>
        </li>
        {shippings.length > 0 && (
          <li className="payment-section__price-component">
            <span className="payment-section__price-label">Shipping:</span>
            {shippings.length === 1 && (
              <span className="payment-section__price-value">{shippings[0].price}</span>
            )}
            {shippings.length > 1 && (
              <ul className="payment-section__price-detail">
                {shippings.map(shipping => (
                  <li key={shipping.label} className="payment-section__price-detail-item">
                    <span className="payment-section__price-detail-label">{shipping.label}</span>
                    <span className="payment-section__price-detail-value">{shipping.price}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}
        {vat && (
          <li className="payment-section__price-component">
            <span className="payment-section__price-label">VAT:</span>
            <span className="payment-section__price-value">{vat}</span>
          </li>
        )}
        <li className="payment-section__total-price">
          <span className="payment-section__price-label">Total:</span>
          <span className="payment-section__price-value">{total}</span>
        </li>
      </ul>
      <div className="payment-section__section-label">{childrenLabel}</div>
      <ul className="payment-section__buttons">
        {React.Children.map(children, child => (
          <li key={child.key} className="payment-section__button">
            {child}
          </li>
        ))}
      </ul>
    </div>
  </section>
)

PaymentSection.propTypes = {
  ...propTypes.component,
  childrenLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  subtotal: PropTypes.string.isRequired,
  shippings: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired
    })
  ),
  vat: PropTypes.string,
  total: PropTypes.string.isRequired
}

export default PaymentSection
