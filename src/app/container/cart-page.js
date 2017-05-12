import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {getUsStateName, getCountryName} from 'Service/country'
import getCloudinaryUrl from 'Lib/cloudinary'
import {
  selectedOfferMaterial,
  selectOfferItems
} from 'Lib/selector'

import {
  formatPrice
} from 'Lib/formatter'

import PageHeader from 'Component/page-header'
import Link from 'Component/link'
import SidebarLayout from 'Component/sidebar-layout'
import Section from 'Component/section'
import Headline from 'Component/headline'
import Button from 'Component/button'
import Grid from 'Component/grid'
import Column from 'Component/column'
import Paragraph from 'Component/paragraph'
import ProviderImage from 'Component/provider-image'
import PaymentSection from 'Component/payment-section'
import ModelQuantityItem from 'Component/model-quantity-item'
import ModelQuantityItemList from 'Component/model-quantity-item-list'
import ColorSquare from 'Component/color-square'
import LoadingIndicator from 'Component/loading-indicator'

import backIcon from 'Icon/back.svg'
import creditCardIcon from 'Icon/credit-card.svg'
// import paypalIcon from 'Icon/paypal.svg'

import {goBack, goToHome, goToSuccess} from 'Action/navigation'
// import {createOrderWithStripe, initPaymentWithPaypal, createOrderWithPaypal} from 'Action/order'
import {payWithStripe, createOrder} from 'Action/order'

import AppLayout from './app-layout'

const CartPage = ({
  user,
  offer,
  offerItems,
  selectedMaterial,
  onGoBack,
  onOrderWithStripe,
  onGoToHome,
  onCreateOrder,
  onGoToSuccess,
  order,
  // onOrderWithPaypal,
  onItemDelete
}) => {
  const CartQantityList = () => {
    const items = offerItems.map(item => (
      <ModelQuantityItem
        imageSource={item.thumbnailUrl}
        key={item.modelId}
        quantity={item.quantity}
        title={item.name}
        onQuantityChange={onGoToHome}
        price={formatPrice(item.price, offer.currency)}
        onDelete={onItemDelete}
      />
    ))
    return (
      <ModelQuantityItemList>
        {items}
      </ModelQuantityItemList>
    )
  }

  const AddressSection = () => (
    <Section modifiers={['highlight']}>
      <Grid>
        <Column md={6}>
          <Headline modifiers={['minor', 's']} label="Shipping Address" />
          <Paragraph modifiers={['l']}>
            {user.shippingAddress.firstName} {user.shippingAddress.lastName}<br />
            {user.shippingAddress.street} {user.shippingAddress.houseNumber}<br />
            {user.shippingAddress.addressLine2}<br />
            {user.shippingAddress.zipCode} {user.shippingAddress.city}<br />
            {
              user.shippingAddress.countryCode === 'US'
              ? <span>{getUsStateName(user.shippingAddress.stateCode)}<br /></span>
              : null
            }
            {getCountryName(user.shippingAddress.countryCode)}
          </Paragraph>
        </Column>
        <Column md={6}>
          <Headline modifiers={['minor', 's']} label="Billing Address" />
          <Paragraph modifiers={['l']}>
            {user.billingAddress.firstName ||
              user.shippingAddress.firstName} {user.billingAddress.lastName ||
              user.shippingAddress.lastName}<br />
            {user.billingAddress.street ||
              user.shippingAddress.street} {user.billingAddress.houseNumber ||
              user.shippingAddress.houseNumber}<br />
            {user.billingAddress.addressLine2 || user.shippingAddress.addressLine2}<br />
            {user.billingAddress.zipCode ||
              user.shippingAddress.zipCode} {user.billingAddress.city ||
              user.shippingAddress.city}<br />
            {
               user.billingAddress.countryCode && user.billingAddress.countryCode === 'US'
              ? <span>{getUsStateName(user.billingAddress.stateCode)}<br /></span>
              : null
            }
            {
               !user.billingAddress.countryCode && user.shippingAddress.countryCode === 'US'
              ? <span>getUsStateName(user.shippingAddress.stateCode)<br /></span>
              : null
            }
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
          <ProviderImage name={offer.printingService} />
        </Column>
        <Column md={6}>
          <Headline modifiers={['minor', 's']} label="Material" />
          <Paragraph modifiers={['l']}>
            {selectedMaterial.material.name},&nbsp;
            {selectedMaterial.material.properties.printingMethod}<br />
            <ColorSquare
              color={selectedMaterial.materialConfig.colorCode}
              image={getCloudinaryUrl(selectedMaterial.materialConfig.colorImage, ['w_40', 'h_40', 'c_fill'])}
            /> {selectedMaterial.materialConfig.color}
          </Paragraph>
        </Column>
      </Grid>
    </Section>
  )

  const backLink = <Link icon={backIcon} onClick={onGoBack} label="Back" />

  const paymentButtons = (
    <div>
      <Button
        modifiers={['block']}
        icon={creditCardIcon}
        label="Pay with Stripe"
        onClick={async () => {
          try {
            await onOrderWithStripe()
          } catch (error) {
            // Early return if user aborted payment
            return
          }

          await onCreateOrder()
          onGoToSuccess()
        }}
      />
      {/*
        <Button icon={paypalIcon} modifiers={['block']}
          label="Pay with Paypal" onClick={onOrderWithPaypal} />
      */}
    </div>
  )

  const paymentSection = (
    <PaymentSection
      subtotal={formatPrice(offer.subTotalPrice, offer.currency)}
      shipping={formatPrice(offer.shipping.price, offer.currency)}
      vat={formatPrice(offer.vatPrice, offer.currency)}
      total={formatPrice(offer.totalPrice, offer.currency)}
    >
      {order.orderInProgress
        ? <div className="u-align-center u-font-size-l "><LoadingIndicator /></div>
        : paymentButtons
      }
    </PaymentSection>
  )

  return (
    <AppLayout currentStep={2}>
      <PageHeader label="Order Summary" backLink={backLink} />
      <SidebarLayout sidebar={paymentSection}>
        <AddressSection />
        <VendorSection />
        <CartQantityList />
      </SidebarLayout>
    </AppLayout>
  )
}

const mapStateToProps = state => ({
  order: state.order,
  offer: state.price.selectedOffer,
  user: state.user.user,
  offerItems: selectOfferItems(state),
  selectedMaterial: selectedOfferMaterial(state)
})

const mapDispatchToProps = {
  onGoBack: goBack,
  onGoToHome: goToHome,
  onGoToSuccess: goToSuccess,
  onOrderWithStripe: payWithStripe,
  onCreateOrder: createOrder,
  // onOrderWithPaypal: createOrderWithPaypal,
  // onPayWithPaypal: initPaymentWithPaypal,
  onItemDelete: () => {} // TODO: add action
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(CartPage)
