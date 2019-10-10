import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const ProviderImage = ({classNames, src, alt, inline = false, minor = false, onClick = null}) =>
  React.createElement(
    onClick ? 'a' : 'div',
    {
      className: cn('ProviderImage', {inline, minor, link: !!onClick}, classNames),
      onClick,
      href: onClick && '#'
    },
    <img className="ProviderImage__image" alt={alt} src={src} />
  )

ProviderImage.propTypes = {
  ...propTypes.component,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  inline: PropTypes.bool,
  minor: PropTypes.bool,
  onClick: PropTypes.func
}

export default ProviderImage
