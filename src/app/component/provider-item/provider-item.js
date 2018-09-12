import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Button from '../button'
import AnnotatedTableCell from '../annotated-table-cell'
import Info from '../info'
import Paragraph from '../paragraph'

import checkoutIcon from '../../../asset/icon/checkout.svg'

const ProviderItem = ({
  classNames,
  modifiers,
  providerName,
  price,
  shippingPrice,
  totalPrice,
  includesVat = false,
  process,
  deliveryTime,
  deliveryProvider,
  providerInfo,
  productionTime,
  checkoutLabel,
  onAddToCartClick = () => {}
}) => (
  <tr className={buildClassName('provider-item', modifiers, classNames)}>
    <td className="provider-item__provider">
      <AnnotatedTableCell annotation={providerInfo}>{providerName}</AnnotatedTableCell>
    </td>
    <td className="provider-item__process">
      <AnnotatedTableCell>{process}</AnnotatedTableCell>
    </td>
    <td className="provider-item__price">
      <AnnotatedTableCell annotation={price}>{productionTime}</AnnotatedTableCell>
    </td>
    <td className="provider-item__shipping-price">
      <AnnotatedTableCell annotation={shippingPrice}>
        {deliveryTime}
        <Info modifiers={['minor']}>
          <Paragraph>{deliveryProvider}</Paragraph>
        </Info>
      </AnnotatedTableCell>
    </td>
    <td className="provider-item__total-price">
      <AnnotatedTableCell>
        <strong>{totalPrice}</strong>
        {includesVat && (
          <Info modifiers={['minor']}>
            <Paragraph>incl. 19% VAT</Paragraph>
          </Info>
        )}
      </AnnotatedTableCell>
    </td>
    <td className="provider-item__action">
      <Button
        icon={checkoutIcon}
        modifiers={['block']}
        label={checkoutLabel}
        onClick={onAddToCartClick}
      />
    </td>
  </tr>
)

ProviderItem.propTypes = {
  ...propTypes.component,
  providerSlug: PropTypes.string.isRequired,
  providerName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  includesVat: PropTypes.bool,
  shippingPrice: PropTypes.string.isRequired,
  onAddToCartClick: PropTypes.func.isRequired,
  process: PropTypes.string.isRequired,
  deliveryTime: PropTypes.string.isRequired,
  providerInfo: PropTypes.string,
  deliveryProvider: PropTypes.string.isRequired,
  productionTime: PropTypes.string.isRequired,
  checkoutLabel: PropTypes.string.isRequired
}

export default ProviderItem
