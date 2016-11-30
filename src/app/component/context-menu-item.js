import React, {PropTypes} from 'react'

import Icon from './icon'
import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'

const ContextMenuItem = ({classNames, modifiers, label, icon, onClick, ...params}) => (
  <button className={buildClassName('context-menu-item', modifiers, classNames)} onClick={onClick} {...params}>
    <Icon classNames={['context-menu-item__icon']} source={icon} />
    {label}
  </button>
)

ContextMenuItem.propTypes = {
  ...propTypes.component,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func
}

export default ContextMenuItem

