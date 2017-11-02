import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import PageHeader from 'Component/page-header'
import Link from 'Component/link'
import Section from 'Component/section'
import Headline from 'Component/headline'
import Paragraph from 'Component/paragraph'
import ProviderImage from 'Component/provider-image'

import {guard} from './util/guard'
import AppLayout from './app-layout'

const CartPage = ({offer, order}) => {
  const SuccessSection = () => (
    <Section modifiers={['highlight']}>
      <Headline
        label={
          order.orderNumber
            ? `Order number: ${order.orderNumber}`
            : 'Thank you for ordering at ALL3DP!'
        }
      />
      <Paragraph modifiers={['l']}>
        You should shortly receive an email confirming your order.
      </Paragraph>
      <Paragraph modifiers={['l']}>
        Please note that your order will be produced and sent from:
      </Paragraph>
      <Paragraph modifiers={['l']}>
        <ProviderImage name={offer.printingService} />
      </Paragraph>
      <Headline label="Any questions?" />
      <Paragraph modifiers={['l']}>
        Email us on <Link href="mailto:support@all3dp.com" label="support@all3dp.com" />
      </Paragraph>
    </Section>
  )

  return (
    <AppLayout>
      <PageHeader label="Thank you for your order at ALL3DP!" />
      <SuccessSection />
    </AppLayout>
  )
}

const mapStateToProps = state => ({
  offer: state.price.selectedOffer,
  order: state.order
})

const mapDispatchToProps = {}

const enhance = compose(
  guard(state => state.price.selectedOffer),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(CartPage)
