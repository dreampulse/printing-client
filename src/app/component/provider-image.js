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
