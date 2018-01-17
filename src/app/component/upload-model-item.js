import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import ImageContainer from './image-container'

const UploadModelItem = ({classNames, modifiers, imageSource, title, subline, quantity}) => (
  <div className={buildClassName('upload-model-item', modifiers, classNames)}>
    <ImageContainer source={imageSource} />
    <div className="upload-model-item__content">
      {Boolean(title) && <strong className="upload-model-item__title">{title}</strong>}
      {Boolean(subline) && <span className="upload-model-item__subline">{subline}</span>}
      {Boolean(quantity) && <span className="upload-model-item__quantity">Qty: {quantity}</span>}
    </div>
  </div>
)

UploadModelItem.propTypes = {
  ...propTypes.component,
  imageSource: PropTypes.string.isRequired,
  title: PropTypes.string,
  subline: PropTypes.string,
  quantity: PropTypes.number
}

export default UploadModelItem
