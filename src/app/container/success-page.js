import React from 'react'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import uniq from 'lodash/uniq'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'

import {getProviderName} from '../lib/provider-selector'
import {openIntercom} from '../service/intercom'

import {scrollToTop} from './util/scroll-to-top'

import ProviderTeaser from '../component/provider-teaser'
import ProviderImage from '../component/provider-image'
import Section from '../component/section'
import Headline from '../component/headline'
import Paragraph from '../component/paragraph'
import Button from '../component/button'
import Link from '../component/link'
import PageLayout from '../component/page-layout'
import Container from '../component/container'

import NavBarPartial from './nav-bar-partial'

import * as coreActions from '../action/core'
import OrderConfirmationList from '../component/order-confirmation-list'
import OrderConfirmationItem from '../component/order-confirmation-item'
import Icon from '../component/icon'

import orderPlaced from '../../asset/icon/order-placed.svg'
import orderStarted from '../../asset/icon/order-started.svg'
import orderShipped from '../../asset/icon/order-shipped.svg'
import orderReceived from '../../asset/icon/order-received.svg'

const SuccessPage = ({location}) => {
  if (!location.state || !location.state.orderNumber) {
    return <Redirect to="/" />
  }
  return (
    <PageLayout header={<NavBarPartial />}>
      <Container>
        <Section classNames={['u-align-center']}>
          <Headline modifiers={['xl']} label="Thank you for ordering with Craftcloud by All3DP" />
          <Headline
            label={location.state.orderNumber ? `Order number: ${location.state.orderNumber}` : ''}
          />
          <Paragraph>
            You should receive an order confirmation email from us shortly. We will also let you
            know when we have received the tracking number for your print from the manufacturer.
            Your order will be produced by:
          </Paragraph>

          <ProviderTeaser classNames={['u-margin-bottom-xl']}>
            {uniq(location.state.vendorIds).map(vendorId => (
              <ProviderImage key={vendorId} slug={vendorId} name={getProviderName(vendorId)} />
            ))}
          </ProviderTeaser>

          <OrderConfirmationList step={1}>
            <OrderConfirmationItem icon={<Icon source={orderPlaced} />} title="Order Placed" />

            <OrderConfirmationItem
              icon={<Icon source={orderStarted} />}
              title="Production started"
            />

            <OrderConfirmationItem icon={<Icon source={orderShipped} />} title="Order shipped" />

            <OrderConfirmationItem icon={<Icon source={orderReceived} />} title="Order Received" />
          </OrderConfirmationList>
        </Section>
        <Section classNames={['u-align-center']}>
          <Headline modifiers={['l']} classNames={['u-margin-bottom-xl']} label="Any questions?" />
          <Button minor label="Contact Us" onClick={() => openIntercom()} />
        </Section>
        <Section classNames={['u-align-center']}>
          <Paragraph>
            Or email us at <Link href="mailto:support@all3dp.com" label="support@all3dp.com" />
          </Paragraph>
        </Section>
      </Container>
    </PageLayout>
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
