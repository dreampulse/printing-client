import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

const Link = ({
  classNames,
  label,
  href = '#',
  icon,
  warning = false,
  onClick = () => {},
  ...rest
}) => (
  <a className={cn('Link', {warning}, classNames)} href={href} onClick={onClick} {...rest}>
    {icon && <Icon source={icon} />}
    {label}
  </a>
)

Link.propTypes = {
  ...propTypes.component,
  label: PropTypes.node.isRequired,
  href: PropTypes.string,
  string: PropTypes.string,
  onClick: PropTypes.func,
  warning: PropTypes.bool
}

export default Link
