import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const OrderConfirmationItem = ({classNames, icon, title = null, date = null, active = false}) => (
  <div className={cn('OrderConfirmationItem', {active}, classNames)}>
    <div className="OrderConfirmationItem__icon">{icon}</div>
    <div className="OrderConfirmationItem__text">
      <div className="OrderConfirmationItem__title">{title}</div>
      <div className="OrderConfirmationItem__date">{date}</div>
    </div>
  </div>
)

OrderConfirmationItem.propTypes = {
  ...propTypes.component,
  icon: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  active: PropTypes.bool,
  title: PropTypes.string,
  date: PropTypes.string
}

export default OrderConfirmationItem
