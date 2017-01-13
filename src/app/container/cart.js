import React from 'react'
import { connect } from 'react-redux'

import Main from '../component/main'
import Button from '../component/button'
import Headline from '../component/headline'
import PaypalButton from '../component/paypal-button'
import SectionHeadline from '../component/section-headline'

import { goBack } from '../action/navigation'
import { createOrderWithStripe, initPaymentWithPaypal, createOrderWithPaypal } from '../action/order'

const Cart = ({
  items,
  quantity,
  shipping,
  selectedShipping,
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

  const ItemRow = ({ item }) => (
    <tr>
      <td />
      <td>file.stl</td>
      <td>{quantity}</td>
      <td>{item.price}</td>
      <td><Button label='Remove' /></td>
    </tr>
  )

  const ShippingSection = () => (
    <section>
      <SectionHeadline label='Shipping options' />
      {shipping ? <ShippingSelect /> : null}
    </section>
  )

  const ShippingSelect = () => (
    <select onChange={e => console.log(e.target.value)} value={selectedShipping}>
      <option>Select shipping</option>
      {shipping.map(s =>
        <option value={s.name} key={s.name}>{s.name}</option>
      )}
    </select>
  )

  const OrderSection = () => (
    <section>
      <SectionHeadline label='Payment' />
      <Button label='Pay with Stripe' onClick={onOrderWithStripe} />
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
      <Headline label='Order summary' modifiers={['xl']} />
      <Button style={{ position: 'absolute', right: '250px', top: '25px' }} label='Back' onClick={onGoBack} />
      <CartPreviewSection />
      <ShippingSection />
      <OrderSection />
    </Main>
  )
}

const mapStateToProps = (state, ownProps) => ({
  items: [{modelId: '0', price: 1.99}], // state.price.price.printingService[state.price.selectedVendor].items,
  shipping: [{name: 'UPS Express'}], // state.price.price.printingService[state.price.selectedVendor].shipping,
  selectedShipping: null, // state.price.selectedShipping,
  quantity: 1
})

const mapDispatchToProps = {
  onGoBack: goBack,
  onOrderWithStripe: createOrderWithStripe,
  onPayWithPaypal: initPaymentWithPaypal,
  onOrderWithPaypal: createOrderWithPaypal
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
