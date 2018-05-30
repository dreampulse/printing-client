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
  const referralUrl = `https://3d-printing-price.all3dp.com/?utm_source=all3dp&utm_campaign=referral&utm_content=${order.orderNumber}`
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
      <Headline label="We extended our special offer: Refer us and earn 20% commission" />
      <Paragraph modifiers={['l']}>
        If you enjoyed using our service, you can refer us by sharing the link below and earn some
        money for yourself.
      </Paragraph>
      <Paragraph modifiers={['l']}>
        <Link href={referralUrl} label={referralUrl} />
      </Paragraph>
      <Paragraph modifiers={['l']}>
        By placing an order through the link above, you will receive 20% commission on the total
        amount of the referred customer&apos;s first order. You can earn even more money if you
        refer our service to additional friends and colleagues. The money will be credited to the
        account that you used to place this order.
      </Paragraph>
      <Paragraph modifiers={['l']}>This offer is valid until July 31st 2018.</Paragraph>
      <Headline label="Any questions?" />
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
