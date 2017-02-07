/*
import React from 'react'
import {connect} from 'react-redux'

import Main from '../component/main'
import Button from '../component/button'
import Headline from '../component/headline'
import PaypalButton from '../component/paypal-button'
import SectionHeadline from '../component/section-headline'

import {goBack} from '../action/navigation'
import {selectShipping, changeQuantity} from '../action/cart'
import {createOrderWithStripe, initPaymentWithPaypal, createOrderWithPaypal} from '../action/order'

const Cart = ({
  items,
  quantity,
  onChangeQuantity,
  shipping,
  selectedShipping,
  onSelectShipping,
  onGoBack,
  onOrderWithStripe,
  onPayWithPaypal,
  onOrderWithPaypal
}) => {
  const CartPreviewSection = () => (
    <section>
      {items ? <ItemsTable /> : null}
    </section>
  )

  const ItemsTable = () => (
    <table style={{border: '1px solid black'}}>
      <thead>
        <tr>
          <th />
          <th>Filename</th>
          <th>Qty</th>
          <th>Price</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {items.map(i => <ItemRow key={i.modelId} item={i} />)}
      </tbody>
    </table>
  )

  const ItemRow = ({item}) => (
    <tr>
      <td />
      <td>file.stl</td>
      <td>{quantity}</td>
      <td>{item.price}</td>
      <td><Button label="Remove" /></td>
    </tr>
  )

  const QuantitySection = () => (
    <section>
      <SectionHeadline label="Choose quantity" />
      <QuantitySelect />
    </section>
  )

  const QuantitySelect = () => (
    <select onChange={e => onChangeQuantity(e.target.value)} value={quantity}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(q =>
        <option value={q} key={q}>{q}</option>
      )}
    </select>
  )

  const ShippingSection = () => (
    <section>
      <SectionHeadline label="Shipping options" />
      {shipping ? <ShippingSelect /> : null}
    </section>
  )

  const ShippingSelect = () => (
    <select onChange={e => onSelectShipping(e.target.value)} value={selectedShipping}>
      <option>Select shipping</option>
      {shipping.map(s =>
        <option value={s.name} key={s.name}>{s.name}</option>
      )}
    </select>
  )

  const OrderSection = () => (
    <section>
      <SectionHeadline label="Payment" />
      <Button label="Pay with Stripe" onClick={onOrderWithStripe} />
      <PaypalButton
        payment={onPayWithPaypal}
        onAuthorize={onOrderWithPaypal}
        onCancel={() => console.log('Payment canceled')}
        onError={() => console.log('Payment failed')}
      />
    </section>
  )

  return (
    <Main>
      <Headline label="Order summary" modifiers={['xl']} />
      <Button
        style={{position: 'absolute', right: '250px', top: '25px'}}
        label="Back"
        onClick={onGoBack}
      />
      <CartPreviewSection />
      <QuantitySection />
      <ShippingSection />
      <OrderSection />
    </Main>
  )
}

const mapStateToProps = state => ({
  items: state.price.price.printingService[state.cart.selectedVendor].items,
  shipping: state.price.price.printingService[state.cart.selectedVendor].shipping,
  selectedShipping: state.cart.selectedShipping,
  quantity: state.cart.quantity
})

const mapDispatchToProps = {
  onGoBack: goBack,
  onSelectShipping: selectShipping,
  onChangeQuantity: changeQuantity,
  onOrderWithStripe: createOrderWithStripe,
  onPayWithPaypal: initPaymentWithPaypal,
  onOrderWithPaypal: createOrderWithPaypal
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
*/
