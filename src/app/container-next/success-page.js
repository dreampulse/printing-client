// @flow

import React from 'react'
import {connect} from 'react-redux'

import {getProviderName} from '../lib/provider-selector'
import type {AppState} from '../reducer-next'
import {selectConfiguredModelInformation} from '../lib/selector'

import AppLayout from './app-layout'

import ProviderTeaser from '../component/provider-teaser'
import ProviderImage from '../component/provider-image'
import Section from '../component/section'
import Headline from '../component/headline'
import PageHeader from '../component/page-header'
import Paragraph from '../component/paragraph'
import Link from '../component/link'

const SuccessPage = ({orderNumber, modelInformations}) => (
  <AppLayout>
    <PageHeader label="Thank you for your order at All3DP!" />
    <Section modifiers={['highlight']}>
      <Headline
        label={orderNumber ? `Order number: ${orderNumber}` : 'Thank you for ordering at All3DP!'}
      />
      <Paragraph modifiers={['l']}>
        You should shortly receive an email confirming your order.
      </Paragraph>
      <Paragraph modifiers={['l']}>
        Please note that your order will be produced and sent from:
      </Paragraph>

      <ProviderTeaser modifiers={['left']}>
        {modelInformations.map(info => (
          <ProviderImage
            key={info.quote.vendorId}
            slug={info.quote.vendorId}
            name={getProviderName(info.quote.vendorId)}
          />
        ))}
      </ProviderTeaser>

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
  </AppLayout>
)

const mapStateToProps = (state: AppState) => ({
  orderNumber: state.core.orderNumber,
  modelInformations: selectConfiguredModelInformation(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPage)
