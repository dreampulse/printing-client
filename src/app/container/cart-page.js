import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {getUsStateName, getCountryName} from 'Service/country'
import {
  selectCurrentMaterial,
  selectCartItems,
  selectCart
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
import LabeledField from 'Component/labeled-field'
import NumberField from 'Component/number-field'

import backIcon from 'Icon/back.svg'
import creditCardIcon from 'Icon/credit-card.svg'
import paypalIcon from 'Icon/paypal.svg'

import AppLayout from './app-layout'

import {goBack} from '../action/navigation'
import {changeQuantity, createShoppingCart} from '../action/cart'
import {createOrderWithStripe, initPaymentWithPaypal, createOrderWithPaypal} from '../action/order'

const CartPage = ({
  cartItems,
  cart,
  user,
  offer,
  selectedMaterial,
  onGoBack,
  onOrderWithStripe,
  onOrderWithPaypal,
  onItemQuantityChange,
  onItemDelete,
  onTotalQuantityChange,
  totalQuantity
}) => {
  // TODO: most item information is missing in the selectedOffer
  // so I used the cartItems
  // TODO: how do I get the image
  const CartQantityList = () => {
    const items = cartItems.map(item => (
      <ModelQuantityItem
        imageSource={''}
        key={item.modelId}
        quantity={item.quantity}
        title={item.name}
        subtitle={JSON.stringify(item, '', 2)}
        price={formatPrice(item.price, cart.currency)}
        onQuantityChange={onItemQuantityChange}
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
          <Headline modifiers={['disabled', 's']} label="Shipping Address" />
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
          <Headline modifiers={['disabled', 's']} label="Billing Address" />
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

  // TODO: how can I get the selected coler?
  const VendorSection = () => (
    <Section modifiers={['highlight']}>
      <Grid>
        <Column md={6}>
          <Headline modifiers={['disabled', 's']} label="Provider" />
          <ProviderImage name={offer.name} />
        </Column>
        <Column md={6}>
          <Headline modifiers={['disabled', 's']} label="Material" />
          <Paragraph modifiers={['l']}>
            {selectedMaterial.name}, {selectedMaterial.properties.printingMethod}<br />
          </Paragraph>
        </Column>
      </Grid>
    </Section>
  )

  const backLink = <Link icon={backIcon} onClick={onGoBack} label="Back" />

  // TODO: connect payment buttons
  const paymentSection = (
    <PaymentSection
      subtotal={formatPrice(cart.subTotal, offer.currency)}
      shipping={formatPrice(cart.shippingTotal, offer.currency)}
      vat={formatPrice(cart.vatTotal, offer.currency)}
      total={formatPrice(cart.totalPrice, offer.currency)}
    >
      <Button modifiers={['block']} icon={creditCardIcon} label="Pay with Stripe" onClick={onOrderWithStripe} />
      <Button icon={paypalIcon} modifiers={['block']} label="Pay with Paypal" onClick={onOrderWithPaypal} />
    </PaymentSection>
  )

  return (
    <AppLayout currentStep={2}>
      <PageHeader label="Order Summary" backLink={backLink} />
      <SidebarLayout sidebar={paymentSection}>
        <AddressSection />
        <VendorSection />
        <Section>
          <LabeledField label="Quantity:">
            <NumberField onChange={onTotalQuantityChange} value={totalQuantity} />
          </LabeledField>
        </Section>
        <CartQantityList />
      </SidebarLayout>
    </AppLayout>
  )
}

const mapStateToProps = state => ({
  cartItems: selectCartItems(state),
  cart: selectCart(state),  // TODO: change this to: state.cart.cart
  offer: state.cart.selectedOffer,
  selectedShipping: state.cart.selectedShipping,
  selectedMaterial: selectCurrentMaterial(state),
  user: state.user.user,
  totalQuantity: 0 // TODO: where do I get the total quantity
})

const mapDispatchToProps = {
  onGoBack: goBack,
  onChangeQuantity: changeQuantity,
  onOrderWithStripe: createOrderWithStripe,
  onOrderWithPaypal: createOrderWithPaypal,
  onPayWithPaypal: initPaymentWithPaypal,
  onCreateShoppingCart: createShoppingCart,
  onItemQuantityChange: () => {}, // TODO: add action
  onItemDelete: () => {}, // TODO: add action
  onTotalQuantityChange: () => {} // TODO: add action
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(CartPage)
