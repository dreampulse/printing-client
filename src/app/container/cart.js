import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
// import {find, propEq} from 'ramda'

import Main from '../component/main'
import Button from '../component/button'
import Headline from '../component/headline'
// import PaypalButton from '../component/paypal-button'
import SectionHeadline from '../component/section-headline'
import Table from '../component/table'
import TableHeadCell from '../component/table-head-cell'
import TableRow from '../component/table-row'
import TableCell from '../component/table-cell'

import {goBack} from '../action/navigation'
import {changeQuantity, createShoppingCart} from '../action/cart'
import {createOrderWithStripe, initPaymentWithPaypal} from '../action/order'

const Cart = ({
  models,
  price,
  selectedShipping,
  selectedVendor,
  onGoBack,
  onOrderWithStripe
  // onPayWithPaypal,
  // onOrderWithPaypal
}) => {
  const pricesFromVendor = price.printingService[selectedVendor]

  // const shipping = find(propEq('name', selectedVendor))(pricesFromVendor.shipping)
  // const priceItemByModelId = pricesFromVendor.items
  //   .reduce((acc, cur) => ({...acc, [cur.modelId]: cur}), {})
  //

  const CartPreviewSection = () => (
    <Table
      head={[
        <TableHeadCell key={0}>Model Name</TableHeadCell>,
        <TableHeadCell key={1}>Price excl. shipping</TableHeadCell>
      ]}
      rows={models.map(model =>
        <TableRow key={model.fileId}>
          <TableCell>{model.name}</TableCell>
          <TableCell><pre>{pricesFromVendor.items}</pre></TableCell>
        </TableRow>
      )}
    />
  )

  const PaymentSection = () => (
    <section>
      <SectionHeadline label="Payment" />
      <Button label="Pay with Stripe" onClick={onOrderWithStripe} />
      {/*
        <PaypalButton
          payment={onPayWithPaypal}
          onAuthorize={onOrderWithPaypal}
          onCancel={() => console.log('Payment canceled')}
          onError={() => console.log('Payment failed')}
        />
       */}
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
      </ul>
      <PaymentSection />
    </Main>
  )
}

const mapStateToProps = state => ({
  models: state.model.models,
  price: state.price.price,
  selectedVendor: state.cart.selectedVendor,
  selectedShipping: state.cart.selectedShipping
})

const mapDispatchToProps = {
  onGoBack: goBack,
  onChangeQuantity: changeQuantity,
  onOrderWithStripe: createOrderWithStripe,
  onPayWithPaypal: initPaymentWithPaypal,
  onCreateShoppingCart: createShoppingCart
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(Cart)
