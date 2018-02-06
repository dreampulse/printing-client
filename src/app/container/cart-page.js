import React from 'react'
import {compose} from 'recompose'
import compact from 'lodash/compact'

import {getStateName, getCountryName} from '../service/country'
import {openIntercom} from '../service/intercom'
import getCloudinaryUrl from '../lib/cloudinary'
import {selectedOfferMaterial, selectOfferItems} from '../lib/selector'
import {formatPrice} from '../lib/formatter'
import {getProviderName} from '../lib/provider-selector'

import PageHeader from '../component/page-header'
import Link from '../component/link'
import SidebarLayout from '../component/sidebar-layout'
import Section from '../component/section'
import Headline from '../component/headline'
import Button from '../component/button'
import Grid from '../component/grid'
import Column from '../component/column'
import Paragraph from '../component/paragraph'
import ProviderImage from '../component/provider-image'
import PaymentSection from '../component/payment-section'
import ModelQuantityItem from '../component/model-quantity-item'
import ModelQuantityItemList from '../component/model-quantity-item-list'
import ColorSquare from '../component/color-square'
import PaypalButton from '../component/paypal-button'

import backIcon from '../../asset/icon/back.svg'
import creditCardIcon from '../../asset/icon/credit-card.svg'

import {goToAddress, goToHome, goToSuccess} from '../action/navigation'
import {
  payWithStripe,
  createOrderWithStripe,
  payWithPaypal,
  createOrderWithPaypal,
  payWithInvoice,
  createOrderWithInvoice
} from '../action/order'
import {openFatalErrorModal} from '../action/modal'

import {guard} from './util/guard'
import {getFeatures} from './util/feature'
import AppLayout from './app-layout'
import {connectLegacy} from './util/connect-legacy'

const CartPage = ({
  user,
  offer,
  offerItems,
  selectedMaterial,
  onGoToAddress,
  onGoToHome,
  onGoToSuccess,
  order,
  features,
  isDirectSales,
  onPayWithStripe,
  onCreateOrderWithStripe,
  onPayWithPaypal,
  onCreateOrderWithPaypal,
  onPayWithInvoice,
  onCreateOrderWithInvoice
}) => {
  const shippingStateName = getStateName(
    user.shippingAddress.countryCode,
    user.shippingAddress.stateCode
  )
  const billingStateName =
    getStateName(user.shippingAddress.countryCode, user.billingAddress.stateCode) ||
    shippingStateName

  const CartQuantityList = () => {
    const items = offerItems.map(item => (
      <ModelQuantityItem
        imageSource={item.thumbnailUrl}
        key={item.modelId}
        quantity={item.quantity}
        title={item.fileName}
        onQuantityChange={(!isDirectSales && (() => onGoToHome())) || undefined}
        price={formatPrice(item.price, offer.currency)}
      />
    ))
    return <ModelQuantityItemList>{items}</ModelQuantityItemList>
  }

  const AddressSection = () => (
    <Section modifiers={['highlight']}>
      <Grid>
        <Column md={6}>
          <Headline modifiers={['minor', 's']} label="Shipping Address" />
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
            {user.shippingAddress.street} {user.shippingAddress.houseNumber}
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
          </Paragraph>
        </Column>
        <Column md={6}>
          <Headline modifiers={['minor', 's']} label="Billing Address" />
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
            {user.billingAddress.street || user.shippingAddress.street}{' '}
            {user.billingAddress.houseNumber || user.shippingAddress.houseNumber}
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
          </Paragraph>
        </Column>
      </Grid>
    </Section>
  )

  const VendorSection = () => (
    <Section modifiers={['highlight']}>
      <Grid>
        <Column md={6}>
          <Headline modifiers={['minor', 's']} label="Provider" />
          <ProviderImage
            slug={offer.printingService}
            name={getProviderName(offer.printingService)}
          />
        </Column>
        <Column md={6}>
          <Headline modifiers={['minor', 's']} label="Material" />
          <Paragraph modifiers={['l']}>
            {selectedMaterial.material.name},&nbsp;
            {selectedMaterial.finishGroup.properties.printingMethod}
            <br />
            <ColorSquare
              color={selectedMaterial.materialConfig.colorCode}
              image={getCloudinaryUrl(selectedMaterial.materialConfig.colorImage, [
                'w_40',
                'h_40',
                'c_fill'
              ])}
            />{' '}
            {selectedMaterial.materialConfig.color}
          </Paragraph>
        </Column>
      </Grid>
    </Section>
  )

  const backLink = (
    <Link
      icon={backIcon}
      onClick={event => {
        event.preventDefault()
        onGoToAddress()
      }}
      label="Back"
    />
  )

  const paymentButtons = compact([
    <Button
      key="payment-button-stripe"
      modifiers={['block']}
      icon={creditCardIcon}
      disabled={order.orderInProgress}
      label="Pay with Credit Card"
      onClick={async () => {
        try {
          await onPayWithStripe()
        } catch (error) {
          // Early return if user aborted payment
          return
        }

        await onCreateOrderWithStripe()
        onGoToSuccess()
      }}
    />,
    <PaypalButton
      key="payment-button-paypal"
      onClick={() => onPayWithPaypal()}
      onAuthorize={async data => {
        const payment = await onCreateOrderWithPaypal(data)
        onGoToSuccess()
        return payment
      }}
    />,
    features.invoice && (
      <Button
        key="payment-button-invoice"
        modifiers={['block']}
        disabled={order.orderInProgress}
        label="Pay with Invoice"
        onClick={async () => {
          await onPayWithInvoice()
          await onCreateOrderWithInvoice()
          onGoToSuccess()
        }}
      />
    )
  ])

  const paymentSection = (
    <PaymentSection
      subtotal={formatPrice(offer.subTotalPrice, offer.currency)}
      shippingPrice={formatPrice(offer.shipping.price, offer.currency)}
      shippingName={offer.shipping.name}
      vat={formatPrice(offer.vatPrice, offer.currency)}
      total={formatPrice(offer.totalPrice, offer.currency)}
      onContactLinkClick={event => {
        openIntercom()
        event.preventDefault()
      }}
    >
      {paymentButtons}
    </PaymentSection>
  )

  return (
    <AppLayout currentStep={2}>
      <PageHeader label="Order Summary" backLink={backLink} />
      <SidebarLayout sidebar={paymentSection}>
        <AddressSection />
        <VendorSection />
        <CartQuantityList />
      </SidebarLayout>
    </AppLayout>
  )
}

const mapStateToProps = state => ({
  order: state.order,
  offer: state.price.selectedOffer,
  user: state.user.user,
  offerItems: selectOfferItems(state),
  selectedMaterial: selectedOfferMaterial(state),
  isDirectSales: state.configuration.isDirectSales
})

const mapDispatchToProps = {
  onGoToAddress: goToAddress,
  onGoToHome: goToHome,
  onGoToSuccess: goToSuccess,
  onOpenFatalErrorModal: openFatalErrorModal,
  onPayWithStripe: payWithStripe,
  onCreateOrderWithStripe: createOrderWithStripe,
  onPayWithPaypal: payWithPaypal,
  onCreateOrderWithPaypal: createOrderWithPaypal,
  onPayWithInvoice: payWithInvoice,
  onCreateOrderWithInvoice: createOrderWithInvoice
}

const enhance = compose(
  guard(state => state.legacy.price.selectedOffer),
  getFeatures,
  connectLegacy(mapStateToProps, mapDispatchToProps)
)

export default enhance(CartPage)
