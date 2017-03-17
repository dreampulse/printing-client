import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {getUsStateName, getUsStates, getCountryName} from 'Service/country'

import PageHeader from 'Component/page-header'
import Link from 'Component/link'
import SidebarLayout from 'Component/sidebar-layout'
import Section from 'Component/section'
import Headline from 'Component/headline'
import Grid from 'Component/grid'
import Column from 'Component/column'
import Paragraph from 'Component/paragraph'

import backIcon from 'Icon/back.svg'

import AppLayout from './app-layout'

import {selectCartItems, selectCart} from '../lib/selector'

import Button from '../component-legacy/button'
import PaypalButton from '../component-legacy/paypal-button'
import SectionHeadline from '../component-legacy/section-headline'
import Table from '../component-legacy/table'
import TableHeadCell from '../component-legacy/table-head-cell'
import TableRow from '../component-legacy/table-row'
import TableCell from '../component-legacy/table-cell'

import {goBack} from '../action/navigation'
import {changeQuantity, createShoppingCart} from '../action/cart'
import {createOrderWithStripe, initPaymentWithPaypal, createOrderWithPaypal} from '../action/order'

const CartPage = ({
  cartItems,
  cart,
  user,
  selectedShipping,
  selectedVendor,
  selectedMaterial,
  onGoBack,
  onOrderWithStripe,
  onPayWithPaypal,
  onOrderWithPaypal
}) => {
  const CartPreviewSection = () => (
    <Table
      head={[
        <TableHeadCell key={0}>Model Name</TableHeadCell>,
        <TableHeadCell key={1}>Price excl. shipping</TableHeadCell>,
        <TableHeadCell key={2}>Quantity</TableHeadCell>,
        <TableHeadCell key={3}>Raw</TableHeadCell>
      ]}
      rows={cartItems.map(item =>
        <TableRow key={item.modelId}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.price} {cart.currency}</TableCell>
          <TableCell>{item.quantity}</TableCell>
          <TableCell><pre>{JSON.stringify(item, '', 2)}</pre></TableCell>
        </TableRow>
      )}
    />
  )

  const TotalPriceSection = () => (
    <Table
      head={[
        <TableHeadCell key={0}>Sub Total</TableHeadCell>,
        <TableHeadCell key={1}>Shipping</TableHeadCell>,
        <TableHeadCell key={2}>VAT</TableHeadCell>,
        <TableHeadCell key={3}>Total</TableHeadCell>
      ]}
      rows={[
        <TableRow key={0}>
          <TableCell>{cart.subTotal}</TableCell>
          <TableCell>{cart.shippingTotal}</TableCell>
          <TableCell>{cart.vatTotal}</TableCell>
          <TableCell>{cart.totalPrice}</TableCell>
        </TableRow>
      ]}
    />
  )

  const PaymentSection = () => (
    <section>
      <SectionHeadline label="Payment" />
      <Button label="Pay with Stripe" onClick={onOrderWithStripe} />
      <PaypalButton
        onPayment={onPayWithPaypal}
        onAuthorize={onOrderWithPaypal}
        onCancel={() => {}}
        onError={() => {}}
      />
    </section>
  )

  const AddressSection = () => (
    <Section modifiers={['highlight']}>
      <Grid>
        <Column md="6">
          <Headline modifiers={['disabled', 's']} label="Shipping Address" />
          <Paragraph modifiers={['l']}>
            {user.shippingAddress.firstName} {user.shippingAddress.lastName}<br />
            {user.shippingAddress.street} {user.shippingAddress.houseNumber}<br />
            {user.shippingAddress.addressLine2}<br />
            {user.shippingAddress.zipCode} {user.shippingAddress.city}<br />
            {
              user.shippingAddress.countryCode === 'US'
              ? <span>getUsStateName(user.shippingAddress.stateCode)<br /></span>
              : null
            }
            {getCountryName(user.shippingAddress.countryCode)}
          </Paragraph>
        </Column>
        <Column md="6">
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
              ? <span>getUsStateName(user.billingAddress.stateCode)<br /></span>
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

  const backLink = <Link icon={backIcon} onClick={onGoBack} label="Back" />
  const paymentSection = (
    <div>
      <PaymentSection />
      <TotalPriceSection />
    </div>
  )
  return (
    <AppLayout currentStep={2}>
      <PageHeader label="Order Summary" backLink={backLink} />
      <SidebarLayout sidebar={paymentSection}>
        <AddressSection />
        <Section modifiers={['highlight']}>
          <ul>
            <li>Selected Vendor: {selectedVendor}</li>
            <li>Selected Shipping Method: {selectedShipping}</li>
            <li>Selected Material-Id: {selectedMaterial}</li>
          </ul>
        </Section>
        <CartPreviewSection />
      </SidebarLayout>
    </AppLayout>
  )
}

const mapStateToProps = state => ({
  cartItems: selectCartItems(state),
  cart: selectCart(state),  // TODO: change this to: state.cart.cart
  selectedVendor: state.cart.selectedVendor,
  selectedShipping: state.cart.selectedShipping,
  selectedMaterial: state.material.selectedMaterial,
  user: state.user.user
})

const mapDispatchToProps = {
  onGoBack: goBack,
  onChangeQuantity: changeQuantity,
  onOrderWithStripe: createOrderWithStripe,
  onOrderWithPaypal: createOrderWithPaypal,
  onPayWithPaypal: initPaymentWithPaypal,
  onCreateShoppingCart: createShoppingCart
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(CartPage)
