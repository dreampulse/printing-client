import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'

import {openIntercom} from '../service/intercom'
import {scrollToTop} from './util/scroll-to-top'
import {getUrlParams} from '../lib/url'
import useBreakpoints from '../hook/use-breakpoints'

import Section from '../component/section'
import Headline from '../component/headline'
import Paragraph from '../component/paragraph'
import Button from '../component/button'
import Link from '../component/link'
import PageLayout from '../component/page-layout'
import Container from '../component/container'
import OrderConfirmationList from '../component/order-confirmation-list'
import OrderConfirmationItem from '../component/order-confirmation-item'
import Icon from '../component/icon'

import FooterPartial from './footer-partial'

import * as coreActions from '../action/core'

import orderPlaced from '../../asset/icon/order-placed.svg'
import orderStarted from '../../asset/icon/order-started.svg'
import orderShipped from '../../asset/icon/order-shipped.svg'
import orderReceived from '../../asset/icon/order-received.svg'

const SuccessPage = ({orderNumber, orderId}) => {
  const breakpoints = useBreakpoints()
  const trackOrderUrl = global.location.origin + '/order-status/' + orderId

  return (
    <PageLayout minorBackground footer={<FooterPartial />}>
      <Container s>
        <Section classNames={['u-align-center']}>
          <Headline
            size="xl"
            classNames={['u-margin-top-xl']}
            label="Thank you for ordering with Craftcloud by All3DP"
          />
          <Headline label={orderNumber ? `Order number: ${orderNumber}` : ''} />
          <Paragraph>
            You should receive an order confirmation email from us shortly. We will also let you
            know when we have received the tracking number for your print from the manufacturer.
          </Paragraph>
          {orderId && (
            <Paragraph>
              <>
                <br />
                <span>
                  You can track the progress of your order here:
                  <br />
                  <Link href={trackOrderUrl} label={trackOrderUrl} />
                </span>
              </>
            </Paragraph>
          )}
        </Section>
        <Section classNames={['u-align-center']}>
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
          <Headline size="l" classNames={['u-margin-bottom-xl']} label="Any questions?" />
          <Button
            block={!breakpoints.tablet}
            minor
            label="Contact Us"
            onClick={() => openIntercom()}
          />
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

const mapStateToProps = state => ({
  orderNumber: state.core.orderNumber,
  orderId: state.core.orderId
})

const mapDispatchToProps = {
  reset: coreActions.reset
}

const enhance = compose(
  scrollToTop(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState(
    'orderNumber',
    'setOrderNumber',
    props => getUrlParams(global.location).orderNumber || props.orderNumber
  ),
  withState(
    'orderId',
    'setOrderId',
    props => getUrlParams(global.location).orderId || props.orderId
  ),
  lifecycle({
    componentDidMount() {
      this.props.reset()
    }
  })
)

export default enhance(SuccessPage)
