import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const CheckoutModelList = ({classNames, modifiers = [], children}) => (
  <section className={buildClassName('checkout-model-list', modifiers, classNames)}>
    <ul className="checkout-model-list__list">
      {React.Children.map(children, (child, index) => (
        <li key={child.props.id || index} className="checkout-model-list__item">
          {child}
        </li>
      ))}
    </ul>
  </section>
)

CheckoutModelList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default CheckoutModelList
