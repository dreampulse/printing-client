import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const ProviderImage = ({classNames, src, alt}) => (
  <div className={cn('ProviderImage', {}, classNames)}>
    <img className="ProviderImage__image" alt={alt} src={src} />
  </div>
)

ProviderImage.propTypes = {
  ...propTypes.component,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
}

export default ProviderImage
