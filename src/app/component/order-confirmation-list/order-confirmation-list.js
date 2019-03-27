import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const OrderConfirmationList = ({classNames, step, children}) => (
  <div className={cn('OrderConfirmationList', step ? {[`step${step}`]: true} : {}, classNames)}>
    <div className="OrderConfirmationList__bar">
      <div className="OrderConfirmationList__progress" />
    </div>
    {React.Children.map(children, (child, index) => (
      <div className="OrderConfirmationList__item">
        {React.cloneElement(child, {active: index < step})}
      </div>
    ))}
  </div>
)

OrderConfirmationList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default OrderConfirmationList
