import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import imaterialiseImage from '../../asset/image/printing-service/imaterialise.png'
import sculpteoImage from '../../asset/image/printing-service/sculpteo.png'
import shapewaysImage from '../../asset/image/printing-service/shapeways.png'

const providerImages = {
  imaterialise: imaterialiseImage,
  sculpteo: sculpteoImage,
  shapeways: shapewaysImage
}

const ProviderImage = ({classNames, modifiers, name, slug}) => (
  <img
    className={buildClassName('provider-image', modifiers, classNames)}
    src={providerImages[slug]}
    alt={name || slug}
  />
)

ProviderImage.propTypes = {
  ...propTypes.component,
  name: PropTypes.string,
  slug: PropTypes.string.isRequired
}

export default ProviderImage
