import React from 'react'
import { connect } from 'react-redux'

import Main from '../component/main'
import Headline from '../component/headline'
import SectionHeadline from '../component/section-headline'
import LoadingIndicator from '../component/loading-indicator'

const Vendor = ({ location, price }) => {
  const json = data => JSON.stringify(data, null, 2)

  const ShippingSection = () => (
    <section>
      <SectionHeadline label='Shipping to' />
      {location ? <pre>{json(location)}</pre> : null}
    </section>
  )

  const PriceSection = () => (
    <section>
      <SectionHeadline label='Prices' />
      {price ? <pre>{json(price)}</pre> : <LoadingIndicator modifiers={['l']} />}
    </section>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Vendor)
