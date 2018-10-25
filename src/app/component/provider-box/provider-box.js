import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const ProviderBox = ({
  classNames,
  modifiers = [],
  icon,
  headline,
  material,
  day,
  daysColumn,
  price,
  priceColumn,
  materialColumn,
  actionButton,
  onClick
}) => (
  <div className={buildClassName('provider-box', modifiers, classNames)} onClick={onClick}>
    <div className="provider-box__header">
      {icon}
      <div className="provider-box__headline">{headline}</div>
      {actionButton}
    </div>
    <div className="provider-box__days-column">
      <div className="provider-box__column-head">{day}</div>
      {daysColumn}
    </div>
    <div className="provider-box__price-column">
      <div className="provider-box__column-head">{price}</div>
      {priceColumn}
    </div>
    <div className="provider-box__material-column">
      <div className="provider-box__column-head">{material}</div>
      {materialColumn}
    </div>
  </div>
)

ProviderBox.propTypes = {
  ...propTypes.component,
  icon: PropTypes.node.isRequired,
  headline: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  daysColumn: PropTypes.node.isRequired,
  price: PropTypes.string.isRequired,
  priceColumn: PropTypes.node.isRequired,
  material: PropTypes.string.isRequired,
  materialColumn: PropTypes.node.isRequired,
  actionButton: PropTypes.node.isRequired,
  onClick: PropTypes.func
}

export default ProviderBox
