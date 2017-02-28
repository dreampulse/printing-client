import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {selectCartItems, selectCart} from '../lib/selector'

import Main from '../component-legacy/main'
import Button from '../component-legacy/button'
import Headline from '../component-legacy/headline'
import PaypalButton from '../component-legacy/paypal-button'
import SectionHeadline from '../component-legacy/section-headline'
import Table from '../component-legacy/table'
import TableHeadCell from '../component-legacy/table-head-cell'
import TableRow from '../component-legacy/table-row'
import TableCell from '../component-legacy/table-cell'

import {goBack} from '../action/navigation'
import {changeQuantity, createShoppingCart} from '../action/cart'
import {createOrderWithStripe, initPaymentWithPaypal, createOrderWithPaypal} from '../action/order'

const Cart = ({
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
    <section>
      <SectionHeadline label="Shipping Address" />
      <pre>{JSON.stringify(user.shippingAddress, '', 2)}</pre>
      <SectionHeadline label="Billing Address" />
      <pre>{JSON.stringify(user.billingAddress, '', 2)}</pre>
    </section>
  )

  return (
    <Main>
      <Button label="Back" onClick={onGoBack} />
      <Headline label="Order summary" modifiers={['xl']} />
      <CartPreviewSection />
      <ul>
        <li>Selected Vendor: {selectedVendor}</li>
        <li>Selected Shipping Method: {selectedShipping}</li>
        <li>Selected Material-Id: {selectedMaterial}</li>
      </ul>
      <AddressSection />
      <TotalPriceSection />
      <PaymentSection />
    </Main>
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

export default enhance(Cart)
