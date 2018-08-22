// @flow

import React from 'react'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import uniq from 'lodash/uniq'

import {compose, lifecycle} from 'recompose'

import {getProviderName} from '../lib/provider-selector'

import AppLayout from './app-layout'

import ProviderTeaser from '../component/provider-teaser'
import ProviderImage from '../component/provider-image'
import Section from '../component/section'
import Headline from '../component/headline'
import PageHeader from '../component/page-header'
import Paragraph from '../component/paragraph'
import Link from '../component/link'

import * as coreActions from '../action/core'

const SuccessPage = ({location}) => {
  if (!location.state || !location.state.orderNumber) {
    return <Redirect to="/" />
  }
  return (
    <AppLayout>
      <PageHeader label="Thank you for your order at All3DP!" />
      <Section modifiers={['highlight']}>
        <Headline
          label={
            location.state.orderNumber
              ? `Order number: ${location.state.orderNumber}`
              : 'Thank you for ordering at All3DP!'
          }
        />
        <Paragraph modifiers={['l']}>
          You should shortly receive an email confirming your order.
        </Paragraph>
        <Paragraph modifiers={['l']}>
          Please note that your order will be produced and sent from:
        </Paragraph>

        <ProviderTeaser modifiers={['left']}>
          {uniq(location.state.vendorIds).map(vendorId => (
            <ProviderImage key={vendorId} slug={vendorId} name={getProviderName(vendorId)} />
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
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  reset: coreActions.reset
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.reset()
    }
  })
)

export default enhance(SuccessPage)
