import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

const Link = ({classNames, modifiers, label, href = '#', icon, onClick = () => {}, ...rest}) => (
  <a
    className={buildClassName('link', modifiers, classNames)}
    href={href}
    onClick={onClick}
    {...rest}
  >
    {icon && <Icon source={icon} />}
    {label}
  </a>
)

Link.propTypes = {
  ...propTypes.component,
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  string: PropTypes.string,
  onClick: PropTypes.func
}

export default Link
