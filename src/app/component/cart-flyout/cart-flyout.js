import PropTypes from 'prop-types'
import React from 'react'
import noop from 'lodash/noop'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Headline from '../headline'

// Has to be in sync with the components style
const MAX_ITEMS = 4

const CartFlyout = ({
  classNames,
  children,
  title,
  onMouseLeave = noop,
  onMouseEnter = noop,
  notify = false,
  trianglePosition = 50
}) => (
  <div
    className={cn(
      'CartFlyout',
      {hasOverflow: React.Children.count(children) > MAX_ITEMS},
      classNames
    )}
    onMouseLeave={onMouseLeave}
    onMouseEnter={onMouseEnter}
  >
    <Headline label={title} light={!notify} primary={notify} />
    <ul className="CartFlyout__items">
      {React.Children.map(children, (child, index) => (
        <li key={`cartFlyoutItem-${index}`}>{child}</li>
      ))}
    </ul>
    <div className="CartFlyout__triangle" style={{left: trianglePosition}} />
  </div>
)

CartFlyout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func,
  notify: PropTypes.bool,
  trianglePosition: PropTypes.number
}

export default CartFlyout
