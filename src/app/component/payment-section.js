import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import {openIntercom} from '../service/intercom'

import Link from './link'
import Headline from './headline'

const onOpenIntercom = event => {
  openIntercom()
  event.preventDefault()
}

const PaymentSection = ({
  classNames,
  modifiers,
  children,
  subtotal,
  shippingPrice,
  shippingName,
  vat,
  total
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
      <li className="payment-section__link">
        <Headline modifiers={['xs']} label="Need different payment option?" />
        <Link label="Contact us." href="mailto:contact@all3dp.com" onClick={onOpenIntercom} />
      </li>
      <li className="payment-section__link">
        <Headline modifiers={['xs']} label="Any questions?" />
        <Link label="Get in touch" href="mailto:contact@all3dp.com" onClick={onOpenIntercom} />
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
  shippingPrice: PropTypes.string.isRequired,
  shippingName: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired
}

export default PaymentSection
