import PropTypes from 'prop-types'
import React from 'react'

import fallbackSource from '../../../asset/image/model-thumbnail-fallback.png'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import MagnifyableItem from '../magnifyable-item'
import ImageContainer from '../image-container'

// Preload fallbackSource as early as possible
const preloadImage = new global.Image()
preloadImage.src = fallbackSource

const DeprecatedUploadModelItem = ({
  classNames,
  modifiers = [],
  imageSource,
  title,
  subline,
  quantity,
  buttonBar,
  onMagnify = Function.prototype
}) => (
  <div className={buildClassName('deprecated-upload-model-item', modifiers, classNames)}>
    <MagnifyableItem ariaLabel={`Load ${title} in interactive model viewer`} onClick={onMagnify}>
      <ImageContainer
        source={imageSource}
        fallbackSource={fallbackSource}
        alt={`Preview image of ${title}`}
      />
    </MagnifyableItem>
    <div className="deprecated-upload-model-item__content">
      {Boolean(title) && <strong className="deprecated-upload-model-item__title">{title}</strong>}
      {Boolean(subline) && <div className="deprecated-upload-model-item__subline">{subline}</div>}
      {Boolean(quantity) && (
        <div className="deprecated-upload-model-item__quantity">Qty: {quantity}</div>
      )}
    </div>
    {buttonBar && <div className="deprecated-upload-model-item__buttons">{buttonBar}</div>}
  </div>
)

DeprecatedUploadModelItem.propTypes = {
  ...propTypes.component,
  id: PropTypes.string.isRequired, // Necessary for ModelList
  imageSource: PropTypes.string.isRequired,
  title: PropTypes.string,
  subline: PropTypes.string,
  quantity: PropTypes.number,
  buttonBar: PropTypes.node,
  onMagnify: PropTypes.func
}

export default DeprecatedUploadModelItem
