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
  shippingPrice,
  shippingName,
  vat,
  total,
  contactLink,
  getInTouchLink,
  termsLink
}) => (
  <section className={buildClassName('payment-section', modifiers, classNames)}>
    <ul className="payment-section__price-components">
      <li className="payment-section__price-component">
        <span className="payment-section__price-label">Subtotal:</span>
        <span className="payment-section__price-value">{subtotal}</span>
      </li>
      <li className="payment-section__price-component">
        <span className="payment-section__price-label">Shipping:</span>
        <span className="payment-section__price-value">{shippingPrice}</span>
        <br />
        <span className="payment-section__price-label-smallprint">{shippingName}</span>
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
      {React.Children.map(children, child => (
        <li key={child.key} className="payment-section__button">
          {child}
        </li>
      ))}
    </ul>
    <ul className="payment-section__links">
      {contactLink && (
        <li className="payment-section__link">
          <Headline modifiers={['xs']} label="Need different payment option?" />
          <Link label="Contact us." href={contactLink} />
        </li>
      )}
      {getInTouchLink && (
        <li className="payment-section__link">
          <Headline modifiers={['xs']} label="Any questions?" />
          <Link label="Get in touch." href={getInTouchLink} />
        </li>
      )}
      {termsLink && (
        <li className="payment-section__link">
          <Link label="Terms of service" href={termsLink} />
        </li>
      )}
    </ul>
  </section>
)

PaymentSection.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  subtotal: PropTypes.string.isRequired,
  shippingPrice: PropTypes.string.isRequired,
  shippingName: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired
}

export default PaymentSection
