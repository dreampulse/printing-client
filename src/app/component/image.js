import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const Image = ({modifiers, classNames, src, alt = ''}) => (
  <img className={buildClassName('image', modifiers, classNames)} src={src} alt={alt} />
)

Image.propTypes = {
  ...propTypes.component,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
}

export default Image
