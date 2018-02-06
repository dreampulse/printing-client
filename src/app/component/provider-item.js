import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Button from './button'
import ProviderImage from './provider-image'
import AnnotatedTableCell from './annotated-table-cell'
import Info from './info'
import Paragraph from './paragraph'

import checkoutIcon from '../../asset/icon/checkout.svg'

const ProviderItem = ({
  classNames,
  modifiers,
  provider,
  price,
  shippingPrice,
  totalPrice,
  includesVat = false,
  process,
  deliveryTime,
  deliveryProvider,
  providerInfo,
  onCheckoutClick = () => {}
}) => (
  <tr className={buildClassName('provider-item', modifiers, classNames)}>
    <td className="provider-item__provider">
      <AnnotatedTableCell annotation={providerInfo}>
        <ProviderImage name={provider} />
      </AnnotatedTableCell>
    </td>
    <td className="provider-item__total-price">
      <AnnotatedTableCell annotation={includesVat ? 'incl. 19% VAT' : ''}>
        {totalPrice}
      </AnnotatedTableCell>
    </td>
    <td className="provider-item__price">{price}</td>
    <td className="provider-item__shipping-price">
      <AnnotatedTableCell annotation={deliveryTime}>
        {shippingPrice}
        <Info modifiers={['minor']}>
          <Paragraph>{deliveryProvider}</Paragraph>
        </Info>
      </AnnotatedTableCell>
    </td>
    <td className="provider-item__process">{process}</td>
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
  totalPrice: PropTypes.string.isRequired,
  includesVat: PropTypes.bool,
  shippingPrice: PropTypes.string.isRequired,
  onCheckoutClick: PropTypes.func.isRequired,
  process: PropTypes.string.isRequired,
  deliveryTime: PropTypes.string.isRequired,
  providerInfo: PropTypes.string,
  deliveryProvider: PropTypes.string
}

export default ProviderItem
