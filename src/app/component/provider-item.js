import React, {PropTypes} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Button from 'Component/button'
import ProviderImage from 'Component/provider-image'

import checkoutIcon from 'Icon/checkout.svg'

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
      <ProviderImage name={provider} />
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
