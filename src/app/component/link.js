import React, {PropTypes} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Icon from 'Component/icon'

const Link = ({classNames, modifiers, label, href = '#', icon, onClick = () => {}}) => (
  <a className={buildClassName('link', modifiers, classNames)} href={href} onClick={onClick}>
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
