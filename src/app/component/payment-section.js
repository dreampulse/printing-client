import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Link from './link'
import Headline from './headline'

const PaymentSection = ({
  classNames,
  modifiers,
  children,
  subtotal,
  shippings,
  vat,
  total,
  onContactLinkClick
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
            <ul className="payment-section__price-detail">
              {shippings.map(shipping => (
                <li key={shipping.label} className="payment-section__price-detail-item">
                  <span className="payment-section__price-detail-label">{shipping.label}</span>
                  <span className="payment-section__price-detail-value">{shipping.price}</span>
                </li>
              ))}
            </ul>
          </li>
        )}
        <li className="payment-section__price-component">
          <span className="payment-section__price-label">VAT:</span>
          <span className="payment-section__price-value">{vat}</span>
        </li>
        <li className="payment-section__total-price">
          <span className="payment-section__price-label">Total:</span>
          <span className="payment-section__price-value">{total}</span>
        </li>
      </ul>
      {children && <div className="payment-section__section-label">Pay with</div>}
      <ul className="payment-section__buttons">
        {React.Children.map(children, child => (
          <li key={child.key} className="payment-section__button">
            {child}
          </li>
        ))}
      </ul>
    </div>
    <ul className="payment-section__links">
      <li className="payment-section__link">
        <Headline modifiers={['xs']} label="Need different payment option?" />
        <Link label="Contact us." href="mailto:contact@all3dp.com" onClick={onContactLinkClick} />
      </li>
      <li className="payment-section__link">
        <Headline modifiers={['xs']} label="Any questions?" />
        <Link label="Get in touch" href="mailto:contact@all3dp.com" onClick={onContactLinkClick} />
        {' or '}
        <Link label="search our knowledge base." href="https://help.all3dp.com" target="_blank" />
      </li>
      <li className="payment-section__link">
        <Link
          target="_blank"
          label="Terms of service"
          href="https://all3dp.com/3dp-price-comparison-terms-of-service/"
        />
      </li>
    </ul>
  </section>
)

PaymentSection.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  subtotal: PropTypes.string.isRequired,
  shippings: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired
    })
  ),
  vat: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  onContactLinkClick: PropTypes.func.isRequired
}

export default PaymentSection
