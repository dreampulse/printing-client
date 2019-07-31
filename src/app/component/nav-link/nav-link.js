import PropTypes from 'prop-types'
import React from 'react'
import noop from 'lodash/noop'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

const NavLink = ({
  classNames,
  icon,
  label,
  onClick = noop,
  href = '#',
  disabled = false,
  target = undefined
}) => {
  const handleLinkClick = event => {
    if (disabled) {
      return
    }
    onClick(event, href)
  }
  return (
    <a
      href={href}
      target={target}
      disabled={disabled}
      onClick={handleLinkClick}
      className={cn('NavLink', {}, classNames)}
    >
      {icon && <Icon source={icon} />}
      {label && <span className="NavLink__label">{label}</span>}
    </a>
  )
}

NavLink.propTypes = {
  ...propTypes.component,
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.shape({
    id: PropTypes.string
  })
}

export default NavLink
