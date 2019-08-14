import PropTypes from 'prop-types'
import React from 'react'
import noop from 'lodash/noop'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

const Link = ({
  classNames,
  label,
  href = '#',
  icon,
  warning = false,
  invert = false,
  largeIcon = false,
  onClick = noop,
  ...rest
}) => {
  const handleOnClick =
    href === '#'
      ? event => {
          event.preventDefault()
          onClick(event)
        }
      : onClick

  return (
    <a
      className={cn('Link', {warning, invert, largeIcon}, classNames)}
      href={href}
      onClick={handleOnClick}
      {...rest}
    >
      {icon && <Icon source={icon} />}
      {label}
    </a>
  )
}

Link.propTypes = {
  ...propTypes.component,
  label: PropTypes.node.isRequired,
  href: PropTypes.string,
  string: PropTypes.string,
  onClick: PropTypes.func,
  warning: PropTypes.bool,
  invert: PropTypes.bool,
  largeIcon: PropTypes.bool
}

export default Link
