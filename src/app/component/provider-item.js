import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Button from './button'

import checkoutIcon from '../../asset/icon/checkout.svg'
import imaterialiseImage from '../../asset/image/printing-service/imaterialise.png'
import sculpteoImage from '../../asset/image/printing-service/sculpteo.png'
import shapewaysImage from '../../asset/image/printing-service/shapeways.png'

const providerImages = {
  imaterialise: imaterialiseImage,
  sculpteo: sculpteoImage,
  shapeways: shapewaysImage
}

const ProviderItem = ({
  classNames,
  modifiers,
  provider,
  price,
  deliveryTime,
  onCheckoutClick = () => {}
}) => (
  <tr className={buildClassName('provider-item', modifiers, classNames)}>
    <td className="provider-item__provider">
      <img src={providerImages[provider]} alt={provider} />
    </td>
    <td className="provider-item__price">{price}</td>
    <td className="provider-item__delivery-time">{deliveryTime}</td>
    <td className="provider-item__checkout">
      <Button icon={checkoutIcon} modifiers={['block']} label="Checkout" onClick={onCheckoutClick} />
    </td>
  </tr>
)

ProviderItem.propTypes = {
  ...propTypes.component,
  provider: PropTypes.string.isRequired,
  price: PropTypes.string,
  deliveryTime: PropTypes.string,
  onCheckoutClick: PropTypes.func
}

export default ProviderItem
