import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import ImageContainer from './image-container'

const ModelItem = ({
  classNames,
  modifiers = [],
  imageSource,
  title,
  subline,
  quantity,
  buttonBar,
  price,
  shippingTime,
  shippingMethod,
  materialName,
  color,
  provider
}) => (
  <div className={buildClassName('model-item', modifiers, classNames)}>
    <ImageContainer source={imageSource} />
    <div className="model-item__content">
      {Boolean(title) && <strong className="model-item__title">{title}</strong>}
      {Boolean(subline) && <div className="model-item__subline">{subline}</div>}
      {Boolean(price) && <div className="model-item__price">{price}</div>}
      {Boolean(quantity) && <div className="model-item__quantity">Qty: {quantity}</div>}
      {Boolean(shippingTime) && <div className="model-item__shipping-time">{shippingTime}</div>}
      {Boolean(color) && <div className="model-item__color">{color}</div>}
      {Boolean(shippingMethod) && (
        <div className="model-item__shipping-method">{shippingMethod}</div>
      )}
    </div>
    {buttonBar && <div className="model-item__buttons">{buttonBar}</div>}
  </div>
)

ModelItem.propTypes = {
  ...propTypes.component,
  id: PropTypes.string.isRequired, // Necessary for ModelList
  imageSource: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subline: PropTypes.string,
  quantity: PropTypes.number.isRequired,
  buttonBar: PropTypes.node,
  color: PropTypes.node.isRequired
}

export default ModelItem
