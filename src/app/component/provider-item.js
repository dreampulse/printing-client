import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Button from './button'
import ProviderImage from './provider-image'
import DeliveryInformation from './delivery-information'

import checkoutIcon from '../../asset/icon/checkout.svg'

const ProviderItem = ({
  classNames,
  modifiers,
  provider,
  price,
  shipping,
  process,
  deliveryTime,
  deliveryProvider,
  providerInfo,
  onCheckoutClick = () => {}
}) => (
  <tr className={buildClassName('provider-item', modifiers, classNames)}>
    <td className="provider-item__provider">
      <ProviderImage name={provider} />
      {providerInfo}
    </td>
    <td className="provider-item__process">{process}</td>
    <td className="provider-item__price">{price}</td>
    <td className="provider-item__shipping">{shipping}</td>
    <td className="provider-item__delivery">
      <DeliveryInformation duration={deliveryTime} provider={deliveryProvider} />
    </td>
    <td className="provider-item__checkout">
      <Button
        icon={checkoutIcon}
        modifiers={['block']}
        label="Checkout"
        onClick={onCheckoutClick}
      />
    </td>
  </tr>
)

ProviderItem.propTypes = {
  ...propTypes.component,
  provider: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  shipping: PropTypes.string.isRequired,
  onCheckoutClick: PropTypes.func.isRequired,
  process: PropTypes.string.isRequired,
  deliveryTime: PropTypes.string.isRequired,
  providerInfo: PropTypes.node,
  deliveryProvider: PropTypes.string
}

export default ProviderItem
