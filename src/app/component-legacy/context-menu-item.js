import React, {PropTypes} from 'react'

import Icon from './icon'
import enhanceClassName from '../lib/enhance-class-name'

const ContextMenuItem = ({label, icon, onClick, ...params}) => (
  <button onClick={onClick} {...params}>
    <Icon classNames={['context-menu-item__icon']} source={icon} />
    {label}
  </button>
)

ContextMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func
}

export default enhanceClassName('context-menu-item')(ContextMenuItem)

