import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'

import Main from '../component/main'
import Button from '../component/button'
import Headline from '../component/headline'
import SectionHeadline from '../component/section-headline'
import LoadingIndicator from '../component/loading-indicator'

import { goToCart } from '../action/navigation'
import { createPriceRequest } from '../action/price'
import { getPriceAmount } from '../lib/get-total-amount'

const Vendor = ({ location, price, onSelectVendor }) => {
  const ShippingSection = () => (
    <section>
      <SectionHeadline label='Shipping to' />
      {location ? <pre>{JSON.stringify(location, null, 2)}</pre> : null}
    </section>
  )

  const PriceSection = () => (
    <section>
      <SectionHeadline label='Prices' />
      {price ? <PriceTable /> : <LoadingIndicator modifiers={['l']} />}
    </section>
  )

  const PriceTable = () => (
    <table style={{border: '1px solid black'}}>
      <thead>
        <tr>
          <th>Provider</th>
          <th>Price incl. shipping</th>
          <th>Shipping ption</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(price.printingService).map(k => <VendorRow key={k} vendor={k} />)}
      </tbody>
    </table>
  )

  const VendorRow = ({ vendor }) => (
    <tr>
      <td>{vendor}</td>
      <td style={{border: '1px solid black'}}>{getPriceAmount(price.printingService[vendor])}</td>
      <td>{price.printingService[vendor].shipping[0].name}</td>
      <td><Button label='Select' onClick={onSelectVendor} /></td>
    </tr>
  )

  return (
    <Main>
      <Headline label='Choose provider & shipping' modifiers={['xl']} />
      <ShippingSection />
      <PriceSection />
    </Main>
  )
}

const mapStateToProps = (state, ownProps) => ({
  location: state.user.user.shippingAddress,
  price: state.price.price
})

const mapDispatchToProps = {
  onSelectVendor: goToCart,
  createPriceRequest: createPriceRequest
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount () {
      this.props.createPriceRequest()
    }
  })
)

export default enhance(Vendor)
