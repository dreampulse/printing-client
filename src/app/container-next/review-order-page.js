import React from 'react'
import {compose} from 'recompose'
import compact from 'lodash/compact'
import {connect} from 'react-redux'

import {getStateName, getCountryName} from '../service/country'
import {openIntercom} from '../service/intercom'
import {formatPrice} from '../lib/formatter'

import * as navigationActions from '../action-next/navigation'

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

import creditCardIcon from '../../asset/icon/credit-card.svg'
import paypalIcon from '../../../src/asset/icon/paypal.svg'

import {guard} from './util/guard'
import CheckoutLayout from './checkout-layout'

const ReviewOrderPage = ({address, onGoToAddress, onGoToCart}) => {
  const shippingStateName = getStateName(
    address.shippingAddress.countryCode,
    address.shippingAddress.stateCode
  )
  const billingStateName =
    getStateName(address.shippingAddress.countryCode, address.billingAddress.stateCode) ||
    shippingStateName

  const renderAddressSection = () => (
    <Section>
      <Grid>
        <Column md={6}>
          <Headline modifiers={['minor', 'l']} label="Shipping Address" />
          <Paragraph modifiers={['l']}>
            {address.companyName ? (
              <span>
                {address.companyName}
                <br />
              </span>
            ) : null}
            {address.vatId ? (
              <span>
                {address.vatId}
                <br />
              </span>
            ) : null}
            {address.shippingAddress.firstName} {address.shippingAddress.lastName}
            <br />
            {address.shippingAddress.address}
            <br />
            {address.shippingAddress.addressLine2}
            <br />
            {address.shippingAddress.zipCode} {address.shippingAddress.city}
            <br />
            {shippingStateName && (
              <span>
                {shippingStateName}
                <br />
              </span>
            )}
            {getCountryName(address.shippingAddress.countryCode)}
            <br />
            <EditLink label="edit" onClick={onGoToAddress} />
          </Paragraph>
        </Column>
        <Column md={6}>
          <Headline modifiers={['minor', 'l']} label="Billing Address" />
          <Paragraph modifiers={['l']}>
            {address.companyName ? (
              <span>
                {address.companyName}
                <br />
              </span>
            ) : null}
            {address.vatId ? (
              <span>
                {address.vatId}
                <br />
              </span>
            ) : null}
            {address.billingAddress.firstName || address.shippingAddress.firstName}{' '}
            {address.billingAddress.lastName || address.shippingAddress.lastName}
            <br />
            {address.billingAddress.address || address.shippingAddress.address}
            <br />
            {address.billingAddress.addressLine2 || address.shippingAddress.addressLine2}
            <br />
            {address.billingAddress.zipCode || address.shippingAddress.zipCode}{' '}
            {address.billingAddress.city || address.shippingAddress.city}
            <br />
            {billingStateName && (
              <span>
                {billingStateName}
                <br />
              </span>
            )}
            {address.billingAddress.countryCode
              ? getCountryName(address.billingAddress.countryCode)
              : getCountryName(address.shippingAddress.countryCode)}
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
        subtotal={formatPrice(5400, 'EUR')}
        shippings={[
          {label: 'i.materialize', price: '$5.00€'},
          {label: 'shapeways', price: '$5.30€'}
        ]}
        vat={formatPrice(500, 'EUR')}
        total={formatPrice(4599, 'EUR')}
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
    <CheckoutLayout title="Checkout" currentStep={2}>
      <PageHeader label="Review Order" />
      <SidebarLayout sidebar={renderPaymentSection()}>
        {renderAddressSection()}
        <Headline
          tag="strong"
          modifiers={['minor', 'l', 'inline']}
          label={
            <React.Fragment key="label">
              Your Order <EditLink label="edit" onClick={onGoToCart} />
            </React.Fragment>
          }
        />
        <CheckoutModelList>
          <ModelItem
            modifiers={['read-only']}
            id="some-id"
            imageSource="http://placehold.it/180x180"
            title="model_item_title.stl"
            subline="42 x 42 x 42 mm"
            quantity={1}
            price="80.99€"
            deliveryTime="2-5 Days"
            shippingTime="2-5 Days"
            shippingMethod="DHL Express"
            providerName="shapeways"
            materialName="Metal, polished"
            providerMaterialName="Polyamide (SLS)"
            color={
              <SelectField
                modifiers={['compact']}
                value={{value: 'item2', colorValue: 'ff0000', label: 'Color'}}
              />
            }
          />
          <ModelItem
            modifiers={['read-only']}
            id="some-id"
            imageSource="http://placehold.it/180x180"
            title="model_item_title.stl"
            subline="42 x 42 x 42 mm"
            quantity={1}
            price="80.99€"
            deliveryTime="2-5 Days"
            shippingTime="2-5 Days"
            shippingMethod="DHL Express"
            providerName="shapeways"
            materialName="Metal, polished"
            providerMaterialName="Polyamide (SLS)"
            color={
              <SelectField
                modifiers={['compact']}
                value={{value: 'item2', colorValue: 'ff0000', label: 'Color'}}
              />
            }
          />
          <ModelItem
            modifiers={['read-only']}
            id="some-id"
            imageSource="http://placehold.it/180x180"
            title="model_item_title.stl"
            subline="42 x 42 x 42 mm"
            quantity={1}
            price="80.99€"
            deliveryTime="2-5 Days"
            shippingTime="2-5 Days"
            shippingMethod="DHL Express"
            providerName="shapeways"
            materialName="Metal, polished"
            providerMaterialName="Polyamide (SLS)"
            color={
              <SelectField
                modifiers={['compact']}
                value={{value: 'item2', colorValue: 'ff0000', label: 'Color'}}
              />
            }
          />
          <ModelItem
            modifiers={['read-only']}
            id="some-id"
            imageSource="http://placehold.it/180x180"
            title="model_item_title.stl"
            subline="42 x 42 x 42 mm"
            quantity={1}
            price="80.99€"
            deliveryTime="2-5 Days"
            shippingTime="2-5 Days"
            shippingMethod="DHL Express"
            providerName="shapeways"
            materialName="Metal, polished"
            providerMaterialName="Polyamide (SLS)"
            color={
              <SelectField
                modifiers={['compact']}
                value={{value: 'item2', colorValue: 'ff0000', label: 'Color'}}
              />
            }
          />
        </CheckoutModelList>
      </SidebarLayout>
    </CheckoutLayout>
  )
}

const mapStateToProps = state => ({
  address: state.core.user
})

const mapDispatchToProps = {
  onGoToAddress: navigationActions.goToAddress,
  onGoToCart: navigationActions.goToCart
}

const enhance = compose(
  guard(state => state.core.cart),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(ReviewOrderPage)
