import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import autotivImage from '../../../asset/image/printing-service/autotiv.png'
import facfoxImage from '../../../asset/image/printing-service/facfox.png'
import harpImage from '../../../asset/image/printing-service/harp.png'
import imaterialiseImage from '../../../asset/image/printing-service/imaterialise.png'
import jawstecImage from '../../../asset/image/printing-service/jawstec.png'
import sculpteoImage from '../../../asset/image/printing-service/sculpteo.png'
import shapewaysImage from '../../../asset/image/printing-service/shapeways.png'
import treatstockImage from '../../../asset/image/printing-service/treatstock.png'
import zverseImage from '../../../asset/image/printing-service/zverse.png'

const providerImages = {
  autotiv: autotivImage,
  facfox: facfoxImage,
  harp: harpImage,
  imaterialise: imaterialiseImage,
  jawstec: jawstecImage,
  sculpteo: sculpteoImage,
  shapeways: shapewaysImage,
  treatstock: treatstockImage,
  zverse: zverseImage
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
