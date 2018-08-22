import React from 'react'
import {compose} from 'recompose'
import compact from 'lodash/compact'
import {connect} from 'react-redux'

import {getStateName, getCountryName} from '../service/country'
import {openIntercom} from '../service/intercom'
import {formatPrice, formatDimensions, formatDeliveryTime} from '../lib/formatter'
import {getProviderName} from '../lib/material'
import {selectCartShippings, selectConfiguredModelInformation} from '../lib/selector'
import getCloudinaryUrl from '../lib/cloudinary'

import PageHeader from '../component/page-header'
import SidebarLayout from '../component/sidebar-layout'
import Section from '../component/section'
import Headline from '../component/headline'
import Button from '../component/button'
import EditLink from '../component/edit-link'
import Link from '../component/link'
import Grid from '../component/grid'
import Column from '../component/column'
import Paragraph from '../component/paragraph'
import PaymentSection from '../component/payment-section'
import CheckoutModelList from '../component/checkout-model-list'
import ModelItem from '../component/model-item'
import SelectField from '../component/select-field'

import * as navigationActions from '../action-next/navigation'
import * as modelViewerAction from '../action-next/model-viewer'

import creditCardIcon from '../../asset/icon/credit-card.svg'
import paypalIcon from '../../../src/asset/icon/paypal.svg'

import {guard} from './util/guard'
import CheckoutLayout from './checkout-layout'

const ReviewOrderPage = ({
  user,
  onGoToAddress,
  onGoToCart,
  cart,
  modelsWithConfig,
  cartShippings,
  onMagnifyModel
}) => {
  const shippingStateName = getStateName(
    user.shippingAddress.countryCode,
    user.shippingAddress.stateCode
  )
  const billingStateName =
    (user.billingAddress &&
      user.billingAddress.stateCode &&
      getStateName(user.shippingAddress.countryCode, user.billingAddress.stateCode)) ||
    shippingStateName

  const renderAddressSection = () => (
    <Section>
      <Grid>
        <Column md={6}>
          <Headline modifiers={['minor', 'l']} label="Shipping Address" />
          <Paragraph modifiers={['l']}>
            {user.companyName ? (
              <span>
                {user.companyName}
                <br />
              </span>
            ) : null}
            {user.vatId ? (
              <span>
                {user.vatId}
                <br />
              </span>
            ) : null}
            {user.shippingAddress.firstName} {user.shippingAddress.lastName}
            <br />
            {user.shippingAddress.address}
            <br />
            {user.shippingAddress.addressLine2}
            <br />
            {user.shippingAddress.zipCode} {user.shippingAddress.city}
            <br />
            {shippingStateName && (
              <span>
                {shippingStateName}
                <br />
              </span>
            )}
            {getCountryName(user.shippingAddress.countryCode)}
            <br />
            <EditLink label="edit" onClick={() => onGoToAddress()} />
          </Paragraph>
        </Column>
        <Column md={6}>
          <Headline modifiers={['minor', 'l']} label="Billing Address" />
          <Paragraph modifiers={['l']}>
            {user.companyName ? (
              <span>
                {user.companyName}
                <br />
              </span>
            ) : null}
            {user.vatId ? (
              <span>
                {user.vatId}
                <br />
              </span>
            ) : null}
            {user.billingAddress.firstName || user.shippingAddress.firstName}{' '}
            {user.billingAddress.lastName || user.shippingAddress.lastName}
            <br />
            {user.billingAddress.address || user.shippingAddress.address}
            <br />
            {user.billingAddress.addressLine2 || user.shippingAddress.addressLine2}
            <br />
            {user.billingAddress.zipCode || user.shippingAddress.zipCode}{' '}
            {user.billingAddress.city || user.shippingAddress.city}
            <br />
            {billingStateName && (
              <span>
                {billingStateName}
                <br />
              </span>
            )}
            {user.billingAddress.countryCode
              ? getCountryName(user.billingAddress.countryCode)
              : getCountryName(user.shippingAddress.countryCode)}
            <br />
            <EditLink label="edit" onClick={onGoToAddress} />
          </Paragraph>
        </Column>
      </Grid>
    </Section>
  )

  const paymentButtons = compact([
    <Button key="payment1" modifiers={['block']} icon={creditCardIcon} label="Credit card" />,
    <Button key="payment2" modifiers={['block']} icon={paypalIcon} label="Paypal" />
  ])

  const renderPaymentSection = () => (
    <React.Fragment>
      <PaymentSection
        classNames={['u-margin-bottom']}
        subtotal={formatPrice(cart.subTotalPrice, cart.currency)}
        shippings={cartShippings.map(shipping => ({
          label: getProviderName(shipping.vendorId),
          price: formatPrice(shipping.price, shipping.currency)
        }))}
        vat={formatPrice(cart.vatPrice, cart.currency)}
        total={formatPrice(cart.totalPrice, cart.currency)}
      >
        {paymentButtons}
      </PaymentSection>
      <Paragraph>
        <Headline
          tag="strong"
          modifiers={['xs']}
          label="Need different payment option?"
          classNames={['u-no-margin-bottom']}
        />
        <Link
          label="Contact us."
          href="mailto:contact@all3dp.com"
          onClick={event => {
            openIntercom()
            event.preventDefault()
          }}
        />
      </Paragraph>
      <Paragraph>
        <Headline
          tag="strong"
          modifiers={['xs']}
          label="Any questions?"
          classNames={['u-no-margin-bottom']}
        />
        <Link
          label="Get in touch"
          href="mailto:contact@all3dp.com"
          onClick={event => {
            openIntercom()
            event.preventDefault()
          }}
        />
        {' or '}
        <Link label="search our knowledge base." href="https://help.all3dp.com" target="_blank" />
      </Paragraph>
      <Paragraph>
        <Link
          target="_blank"
          label="Terms of service"
          href="https://all3dp.com/3dp-price-comparison-terms-of-service/"
        />
      </Paragraph>
    </React.Fragment>
  )

  return (
    <CheckoutLayout title="Checkout" currentStep={1}>
      <PageHeader label="Review Order" />
      <SidebarLayout sidebar={renderPaymentSection()}>
        {renderAddressSection()}
        <Headline
          tag="strong"
          modifiers={['minor', 'l', 'inline']}
          label={
            <React.Fragment key="label">
              Your Order <EditLink label="edit" onClick={() => onGoToCart()} />
            </React.Fragment>
          }
        />
        <CheckoutModelList>
          {modelsWithConfig.map(
            ({
              modelConfig,
              model,
              shipping,
              quote,
              process,
              providerInfo,
              materialConfigId,
              colorCode,
              color,
              colorImage
            }) => (
              <ModelItem
                modifiers={['read-only']}
                key={modelConfig.id}
                id={modelConfig.id}
                imageSource={model.thumbnailUrl}
                title={model.fileName}
                subline={formatDimensions(model.dimensions, model.fileUnit)}
                quantity={modelConfig.quantity}
                price={formatPrice(user.isCompany ? quote.price : quote.grossPrice, quote.currency)}
                deliveryTime={formatDeliveryTime(shipping.deliveryTime)}
                shippingMethod={shipping.name}
                providerId={shipping.vendorId}
                materialName={process}
                providerMaterialName={providerInfo}
                onMagnify={() => onMagnifyModel(model)}
                color={
                  <SelectField
                    modifiers={['compact']}
                    value={{
                      value: materialConfigId,
                      colorValue: colorCode,
                      label: color,
                      colorImage:
                        colorImage && getCloudinaryUrl(colorImage, ['w_40', 'h_40', 'c_fill'])
                    }}
                  />
                }
              />
            )
          )}
        </CheckoutModelList>
      </SidebarLayout>
    </CheckoutLayout>
  )
}

const mapStateToProps = state => ({
  user: state.core.user,
  cart: state.core.cart,
  shippings: state.core.shippings,
  modelConfigs: state.core.modelConfigs,
  modelsWithConfig: selectConfiguredModelInformation(state),
  cartShippings: selectCartShippings(state)
})

const mapDispatchToProps = {
  onGoToAddress: navigationActions.goToAddress,
  onGoToCart: navigationActions.goToCart,
  onMagnifyModel: modelViewerAction.open
}

const enhance = compose(
  guard(state => state.core.cart),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(ReviewOrderPage)
