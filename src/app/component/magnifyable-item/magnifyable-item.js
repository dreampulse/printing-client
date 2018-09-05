import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'
import {ariaButtonProps} from '../../lib/aria'

import Icon from '../icon'
import zoomIn from '../../../asset/icon/zoom-in.svg'

const MagnifyableItem = ({
  classNames,
  modifiers,
  children,
  ariaLabel,
  onClick = Function.prototype
}) => (
  <div
    className={buildClassName('magnifyable-item', modifiers, classNames)}
    {...ariaButtonProps({ariaLabel, onClick})}
  >
    {children}
    <Icon classNames={['magnifyable-item__icon']} source={zoomIn} title="" />
  </div>
)

MagnifyableItem.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default MagnifyableItem
