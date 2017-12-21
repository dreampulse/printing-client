import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Button from './button'
import ProviderImage from './provider-image'

import checkoutIcon from '../../asset/icon/checkout.svg'

const ProviderItem = ({
  classNames,
  modifiers,
  provider,
  price,
  shipping,
  onCheckoutClick = () => {}
}) => (
  <tr className={buildClassName('provider-item', modifiers, classNames)}>
    <td className="provider-item__provider">
      <ProviderImage name={provider} />
    </td>
    <td className="provider-item__price">{price}</td>
    <td className="provider-item__shipping">{shipping}</td>
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
  price: PropTypes.string,
  shipping: PropTypes.string,
  onCheckoutClick: PropTypes.func
}

export default ProviderItem
