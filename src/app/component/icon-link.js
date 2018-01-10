import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

const IconLink = ({
  classNames,
  modifiers = [],
  icon,
  disabled = false,
  href = '#',
  onClick = () => {},
  cartCount = 0
}) => (
  <a
    className={buildClassName('icon-link', modifiers, classNames)}
    aria-disabled={disabled}
    onClick={onClick}
    href={href}
  >
    <Icon source={icon} />
    {cartCount > 0 && <span className="icon-link__cart-count">{cartCount}</span>}
  </a>
)

IconLink.propTypes = {
  ...propTypes.component,
  icon: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.string,
  cartCount: PropTypes.number
}

export default IconLink
