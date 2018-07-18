import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import ImageContainer from './image-container'
import Icon from './icon'
import Info from './info'
import ProviderImage from './provider-image'
import MagnifyableItem from './magnifyable-item'

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
  deliveryTime,
  shippingMethod,
  materialName,
  color,
  providerName,
  providerMaterialName,
  onMagnify = Function.prototype
}) => (
  <div className={buildClassName('model-item', modifiers, classNames)}>
    <MagnifyableItem ariaLabel={`Load ${title} in interactive model viewer`} onClick={onMagnify}>
      <ImageContainer source={imageSource} alt={`Preview image of ${title}`} />
    </MagnifyableItem>
    <div className="model-item__center-content">
      <strong className="model-item__title">{title}</strong>
      {Boolean(subline) && <div className="model-item__subline">{subline}</div>}
      <div className="model-item__value">{materialName}</div>
      <div className="model-item__value">{color}</div>
      <div className="model-item__provider">
        <ProviderImage slug={providerName} modifiers={['s']} />{' '}
        {Boolean(providerMaterialName) && <Info modifiers={['minor']}>{providerMaterialName}</Info>}
      </div>
    </div>
    <div className="model-item__right-content">
      <div className="model-item__price">{price}</div>
      <div className="model-item__value">Qty: {quantity}</div>
      <div className="model-item__value">
        <Icon source={ShippingIcon} /> {deliveryTime}
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
  deliveryTime: PropTypes.string.isRequired,
  shippingMethod: PropTypes.string.isRequired,
  materialName: PropTypes.string.isRequired,
  providerName: PropTypes.string.isRequired,
  providerMaterialName: PropTypes.string,
  onMagnify: PropTypes.func
}

export default ModelItem
