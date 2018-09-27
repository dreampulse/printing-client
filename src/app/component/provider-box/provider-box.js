import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const ProviderBox = ({
  classNames,
  modifiers = [],
  icon,
  headline,
  image,
  day,
  daysColumn,
  price,
  priceColumn,
  materialColumn,
  actionButton
}) => (
  <div className={buildClassName('provider-box', modifiers, classNames)}>
    <div className="provider-box__header">
      {icon}
      {headline}
    </div>
    <div className="provider-box__image" style={{backgroundImage: `url(${image})`}} />
    <div className="provider-box__days-column">
      <div className="provider-box__column-head">{day}</div>
      {daysColumn}
    </div>
    <div className="provider-box__price-column">
      <div className="provider-box__column-head">{price}</div>
      {priceColumn}
    </div>
    <div className="provider-box__material-column">{materialColumn}</div>
    <div className="provider-box__action-button">{actionButton}</div>
  </div>
)

ProviderBox.propTypes = {
  ...propTypes.component,
  icon: PropTypes.node.isRequired,
  headline: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  daysColumn: PropTypes.node.isRequired,
  price: PropTypes.string.isRequired,
  priceColumn: PropTypes.node.isRequired,
  materialColumn: PropTypes.node.isRequired,
  actionButton: PropTypes.node.isRequired
}

export default ProviderBox
