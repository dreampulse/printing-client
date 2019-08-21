import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const Image = ({classNames, src, alt = ''}) => (
  <img className={cn('Image', {}, classNames)} src={src} alt={alt} />
)

Image.propTypes = {
  ...propTypes.component,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
}

export default Image
