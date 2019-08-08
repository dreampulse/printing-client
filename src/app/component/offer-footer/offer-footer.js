import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const OfferFooter = ({classNames, priceLabel, price, subline}) => (
  <section className={buildClassName('OfferFooter', {}, classNames)}>
    <span className="OfferFooter__priceLabel">{priceLabel}</span>
    <strong className="OfferFooter__price">{price}</strong>
    <div className="OfferFooter__subline">{subline}</div>
  </section>
)

OfferFooter.propTypes = {
  ...propTypes.component,
  priceLabel: PropTypes.string,
  price: PropTypes.string,
  subline: PropTypes.node
}

export default OfferFooter
