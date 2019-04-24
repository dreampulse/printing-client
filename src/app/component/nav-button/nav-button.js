import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

const NavButton = ({classNames, icon, label, disabled = false}) => (
  <button disabled={disabled} type="button" className={cn('NavButton', {}, classNames)}>
    {icon && <Icon source={icon} />}
    {label && <span className="NavButton__label">{label}</span>}
  </button>
)

NavButton.propTypes = {
  ...propTypes.component,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.shape({
    id: PropTypes.string
  })
}

export default NavButton
