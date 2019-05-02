import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import logoImage from '../../../asset/image/logo.svg'

const Logo = ({classNames, href = '#', alt = 'Craftcloud by All3DP'}) => (
  <a className={cn('Logo', classNames)} href={href} target="_blank" rel="noopener noreferrer">
    <img className="Logo__image" src={logoImage} alt={alt} />
  </a>
)

Logo.propTypes = {
  ...propTypes.component,
  href: PropTypes.string,
  alt: PropTypes.string
}

export default Logo
