import PropTypes from 'prop-types'
import React from 'react'
import {Transition} from 'react-transition-group'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const OrderConfirmationList = ({classNames, step, children}) => (
  // <Transition in appear>
  //   {state =>
  // console.log('-- state', state, step && state !== 'exited' ? {[`step${step}`]: true} : {}) || (
  <div
    className={cn(
      'OrderConfirmationList',
      step /*&& state !== 'exited'*/ ? {[`step${step}`]: true} : {},
      classNames
    )}
  >
    <div className="OrderConfirmationList__bar">
      <div className="OrderConfirmationList__progress" />
    </div>
    {React.Children.map(children, (child, index) => (
      <div className="OrderConfirmationList__item">
        {React.cloneElement(child, {active: index < step})}
      </div>
    ))}
  </div>
  //     )
  //   }
  // </Transition>
)

OrderConfirmationList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default OrderConfirmationList
