import React from 'react'
import {compose} from 'recompose'

import PageHeader from '../component/page-header'
import Link from '../component/link'
import Section from '../component/section'
import Headline from '../component/headline'
import Paragraph from '../component/paragraph'
import ProviderImage from '../component/provider-image'

import {connectLegacy} from './util/connect-legacy'
import {guard} from './util/guard'
import AppLayout from './app-layout'
import {getProviderName} from '../lib/provider-selector'

const CartPage = ({offer, order}) => {
  const SuccessSection = () => (
    <Section modifiers={['highlight']}>
      <Headline
        label={
          order.orderNumber
            ? `Order number: ${order.orderNumber}`
            : 'Thank you for ordering at All3DP!'
        }
      />
      <Paragraph modifiers={['l']}>
        You should shortly receive an email confirming your order.
      </Paragraph>
      <Paragraph modifiers={['l']}>
        Please note that your order will be produced and sent from:
      </Paragraph>
      <Paragraph modifiers={['l']}>
        <ProviderImage slug={offer.printingService} name={getProviderName(offer.printingService)} />
      </Paragraph>
      <Headline label="What happens now?" />
      <Paragraph modifiers={['l']}>
        Your order is going through manual checks for printability at the manufacturer. At this
        first step they make sure that small details and necessary parts are printable. Thereafter
        the order is pushed to production, finishing and finally to quality control before being
        shipped out. We will send you an update on your order when we have received the tracking
        number from the manufacturer.
      </Paragraph>
      <Headline label="Should you have any questions regarding your order" />
      <Paragraph modifiers={['l']}>
        Email us on <Link href="mailto:support@all3dp.com" label="support@all3dp.com" />
      </Paragraph>
    </Section>
  )

  return (
    <AppLayout>
      <PageHeader label="Thank you for your order at All3DP!" />
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
  guard(state => state.legacy.price.selectedOffer),
  connectLegacy(mapStateToProps, mapDispatchToProps)
)

export default enhance(CartPage)
