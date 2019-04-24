import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Headline from '../headline'

const CartFylout = ({classNames, children, title}) => (
  <div className={cn('CartFlyout', {}, classNames)}>
    <Headline label={title} modifiers={['light']} />
    <ul className="CartFlyout__items">
      {React.Children.map(children, (child, index) => (
        <li key={`cartFlyoutItem-${index}`}>{child}</li>
      ))}
    </ul>
  </div>
)

CartFylout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
}

export default CartFylout
