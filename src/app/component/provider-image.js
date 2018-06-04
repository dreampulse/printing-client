import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import ff3dmImage from '../../asset/image/printing-service/ff3dm.png'
import imaterialiseImage from '../../asset/image/printing-service/imaterialise.png'
import sculpteoImage from '../../asset/image/printing-service/sculpteo.png'
import shapewaysImage from '../../asset/image/printing-service/shapeways.png'
import trinckleImage from '../../asset/image/printing-service/trinckle.svg'
import treatstockImage from '../../asset/image/printing-service/treatstock.png'

const providerImages = {
  ff3dm: ff3dmImage,
  imaterialise: imaterialiseImage,
  sculpteo: sculpteoImage,
  shapeways: shapewaysImage,
  trinckle: trinckleImage,
  treatstock: treatstockImage
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
  name: PropTypes.string.isRequired,
  slug: PropTypes.string
}

export default ProviderImage
