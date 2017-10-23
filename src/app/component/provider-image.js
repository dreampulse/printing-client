import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import imaterialiseImage from 'Image/printing-service/imaterialise.png'
import sculpteoImage from 'Image/printing-service/sculpteo.png'
import shapewaysImage from 'Image/printing-service/shapeways.png'

const providerImages = {
  imaterialise: imaterialiseImage,
  sculpteo: sculpteoImage,
  shapeways: shapewaysImage
}

const ProviderItem = ({classNames, modifiers, name}) => (
  <img
    className={buildClassName('provider-image', modifiers, classNames)}
    src={providerImages[name]}
    alt={name}
  />
)

ProviderItem.propTypes = {
  ...propTypes.component,
  name: PropTypes.string.isRequired
}

export default ProviderItem
