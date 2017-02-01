import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'

import Main from '../component/main'
import Button from '../component/button'
import Headline from '../component/headline'
import SectionHeadline from '../component/section-headline'
import LoadingIndicator from '../component/loading-indicator'

import {goBack} from '../action/navigation'
import {selectVendor} from '../action/cart'
import {createPriceRequest} from '../action/price'
import {getPriceAmount} from '../lib/get-total-amount'

const Vendor = ({location, addressDetectionFailed, price, onGoBack, onSelectVendor}) => {
  const ShippingSection = () => (
    <section>
      <SectionHeadline label="Shipping to" />
      {location ? <pre>{JSON.stringify(location, null, 2)}</pre> : null}
      {addressDetectionFailed ? <p>Location detection failed!</p> : null}
    </section>
  )

  const PriceSection = () => (
    <section>
      <SectionHeadline label="Prices" />
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

  const VendorRow = ({vendor}) => (
    <tr>
      <td>{vendor}</td>
      <td style={{border: '1px solid black'}}>{getPriceAmount(price.printingService[vendor])}</td>
      <td>{price.printingService[vendor].shipping[0].name}</td>
      <td><Button label="Select" onClick={() => onSelectVendor(vendor)} /></td>
    </tr>
  )

  return (
    <Main>
      <Headline label="Choose provider & shipping" modifiers={['xl']} />
      <Button style={{position: 'absolute', right: '250px', top: '25px'}} label="Back" onClick={onGoBack} />
      <ShippingSection />
      <PriceSection />
    </Main>
  )
}

const mapStateToProps = state => ({
  location: state.user.user.shippingAddress,
  addressDetectionFailed: state.user.addressDetectionFailed,
  price: state.price.price
})

const mapDispatchToProps = {
  onGoBack: goBack,
  onSelectVendor: selectVendor,
  createPriceRequest
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
