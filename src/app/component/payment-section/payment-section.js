import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const PaymentSection = ({classNames, children, childrenLabel, subtotal, shippings, vat, total}) => (
  <section className={cn('PaymentSection', {}, classNames)}>
    <ul className="PaymentSection__priceComponents">
      <li className="PaymentSection__priceComponent">
        <span className="PaymentSection__priceLabel">Subtotal:</span>
        <span className="PaymentSection__priceValue">{subtotal}</span>
      </li>
      {shippings.length > 0 && (
        <li className="PaymentSection__priceComponent">
          <span className="PaymentSection__priceLabel">Shipping:</span>
          {shippings.length === 1 && (
            <span className="PaymentSection__priceValue">{shippings[0].price}</span>
          )}
          {shippings.length > 1 && (
            <ul className="PaymentSection__priceDetail">
              {shippings.map(shipping => (
                <li key={shipping.label} className="PaymentSection__priceDetailItem">
                  <span className="PaymentSection__priceDetailLabel">{shipping.label}</span>
                  <span className="PaymentSection__priceDetailValue">{shipping.price}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      )}
      {vat && (
        <li className="PaymentSection__priceComponent">
          <span className="PaymentSection__priceLabel">VAT:</span>
          <span className="PaymentSection__priceValue">{vat}</span>
        </li>
      )}
      <li className="PaymentSection__totalPrice">
        <span className="PaymentSection__priceLabel">Total:</span>
        <span className="PaymentSection__priceValue">{total}</span>
      </li>
    </ul>
    {childrenLabel && <div className="PaymentSection__sectionLabel">{childrenLabel}</div>}
    <ul className="PaymentSection__buttons">
      {React.Children.map(children, (child, index) => (
        <li key={index} className="PaymentSection__button">
          {child}
        </li>
      ))}
    </ul>
  </section>
)

PaymentSection.propTypes = {
  ...propTypes.component,
  childrenLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
  subtotal: PropTypes.string.isRequired,
  shippings: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired
    })
  ),
  vat: PropTypes.string,
  total: PropTypes.node.isRequired
}

export default PaymentSection
