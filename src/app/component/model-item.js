import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import ImageContainer from './image-container'
import Icon from './icon'
import Info from './info'
import ProviderImage from './provider-image'

import ShippingIcon from '../../asset/icon/shipping.svg'

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
  providerName,
  providerMaterialName
}) => (
  <div className={buildClassName('model-item', modifiers, classNames)}>
    {/* TODO: include new image preview component here */}
    <ImageContainer source={imageSource} alt={`Preview image of ${title}`} />
    <div className="model-item__center-content">
      <strong className="model-item__title">{title}</strong>
      {Boolean(subline) && <div className="model-item__subline">{subline}</div>}
      <div className="model-item__value">{materialName}</div>
      <div className="model-item__value">{color}</div>
      <div className="model-item__provider">
        <ProviderImage name={providerName} />{' '}
        {Boolean(providerMaterialName) && <Info modifiers={['minor']}>{providerMaterialName}</Info>}
      </div>
    </div>
    <div className="model-item__right-content">
      <div className="model-item__price">{price}</div>
      <div className="model-item__value">Qty: {quantity}</div>
      <div className="model-item__value">
        <Icon source={ShippingIcon} /> {shippingTime}
      </div>
      <div className="model-item__value">{shippingMethod}</div>
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
  color: PropTypes.node.isRequired,
  price: PropTypes.string.isRequired,
  shippingTime: PropTypes.string.isRequired,
  shippingMethod: PropTypes.string.isRequired,
  materialName: PropTypes.string.isRequired,
  providerName: PropTypes.string.isRequired,
  providerMaterialName: PropTypes.string
}

export default ModelItem
