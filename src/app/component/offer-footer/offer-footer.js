import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

import Icon from '../icon'

import listIcon from '../../../asset/icon/list.svg'

const OfferFooter = ({classNames, priceLabel, price, subline, onOpenSidebar}) => (
  <section className={buildClassName('OfferFooter', {}, classNames)}>
    {onOpenSidebar && (
      <button type="button" className="OfferFooter__listButton" onClick={onOpenSidebar}>
        <Icon block source={listIcon} />
      </button>
    )}
    <div className="OfferFooter__content">
      <span className="OfferFooter__priceLabel">{priceLabel}</span>
      <strong className="OfferFooter__price">{price}</strong>
      <div className="OfferFooter__subline">{subline}</div>
    </div>
  </section>
)

OfferFooter.propTypes = {
  ...propTypes.component,
  priceLabel: PropTypes.string,
  price: PropTypes.string,
  subline: PropTypes.node,
  onOpenSidebar: PropTypes.func
}

export default OfferFooter
