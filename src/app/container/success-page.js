import React from 'react'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import uniq from 'lodash/uniq'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'

import {getProviderName} from '../lib/provider-selector'
import {openIntercom} from '../service/intercom'

import AppLayout from './app-layout'
import {scrollToTop} from './util/scroll-to-top'

import ProviderTeaser from '../component/provider-teaser'
import ProviderImage from '../component/provider-image'
import Section from '../component/section'
import Headline from '../component/headline'
import Paragraph from '../component/paragraph'

import * as coreActions from '../action/core'
import OrderConfirmationList from '../component/order-confirmation-list'
import OrderConfirmationItem from '../component/order-confirmation-item'
import Icon from '../component/icon'

import orderPlaced from '../../asset/icon/order-placed.svg'
import orderStarted from '../../asset/icon/order-started.svg'
import orderShipped from '../../asset/icon/order-shipped.svg'
import orderReceived from '../../asset/icon/order-received.svg'
import Button from '../component/button'

const SuccessPage = ({location}) => {
  if (!location.state || !location.state.orderNumber) {
    return <Redirect to="/" />
  }
  return (
    <AppLayout minorBackground>
      <Section classNames={['u-align-center']}>
        <Headline modifiers={['xl']} label="Thank you for ordering with Craftcloud by All3DP!" />
        <Headline
          label={
            location.state.orderNumber
              ? `Order number: ${location.state.orderNumber}`
              : 'Thank you for ordering with Craftcloud by All3DP!'
          }
        />
        <Paragraph>
          Your should shortly receive an <strong>email confirming</strong> your oder. We will also
          send you an update on your order when we have received the tracking number from the
          manufacturer. Please note that your order will be produced and sent from:
        </Paragraph>

        <ProviderTeaser classNames={['u-margin-bottom-xl']}>
          {uniq(location.state.vendorIds).map(vendorId => (
            <ProviderImage key={vendorId} slug={vendorId} name={getProviderName(vendorId)} />
          ))}
        </ProviderTeaser>

        <OrderConfirmationList step={1}>
          <OrderConfirmationItem icon={<Icon source={orderPlaced} />} firstLine="Order Placed" />

          <OrderConfirmationItem
            icon={<Icon source={orderStarted} />}
            firstLine="Production started"
          />

          <OrderConfirmationItem icon={<Icon source={orderShipped} />} firstLine="Order shipped" />

          <OrderConfirmationItem
            icon={<Icon source={orderReceived} />}
            firstLine="Order Received"
          />
        </OrderConfirmationList>
      </Section>
      <Section classNames={['u-align-center']}>
        <Headline modifiers={['l']} label="Any Questions?" />
        <Paragraph classNames={['u-margin-bottom-xl']}>
          <strong>Contact us</strong> if you have any questions.
        </Paragraph>
        <Button minor label="Contact Us" onClick={() => openIntercom()} />
      </Section>
    </AppLayout>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  reset: coreActions.reset
}

const enhance = compose(
  scrollToTop(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.reset()
    }
  })
)

export default enhance(SuccessPage)
