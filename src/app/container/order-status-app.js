import React from 'react'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'

import {scrollToTop} from './util/scroll-to-top'
import {getOrderStatus} from '../lib/printing-engine'
import {openIntercom} from '../service/intercom'
import {removeBootsplash} from '../service/bootsplash'

import FooterPartial from './footer-partial'
import NavBarPartial from './nav-bar-partial'

import AppLayout from '../component/app-layout'
import LoadingContainer from '../component/loading-container'
import Container from '../component/container'
import PageLayout from '../component/page-layout'
import Section from '../component/section'
import Headline from '../component/headline'
import Paragraph from '../component/paragraph'
import Button from '../component/button'
import OrderConfirmationList from '../component/order-confirmation-list'
import OrderConfirmationItem from '../component/order-confirmation-item'
import Icon from '../component/icon'
import Link from '../component/link'

import orderPlaced from '../../asset/icon/order-placed.svg'
import orderStarted from '../../asset/icon/order-started.svg'
import orderShipped from '../../asset/icon/order-shipped.svg'
import orderReceived from '../../asset/icon/order-received.svg'

const localDate = orderStatus =>
  orderStatus &&
  orderStatus.date &&
  new Date(orderStatus.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

const OrderStatusApp = ({orderStatusError, orderStatus}) => (
  <AppLayout header={<NavBarPartial helpOnly />}>
    <PageLayout minorBackground stickyFooter={<FooterPartial />}>
      {!orderStatusError && !orderStatus ? (
        <LoadingContainer insideContent />
      ) : (
        <Container>
          {orderStatus && !orderStatus.cancelled && (
            <Section classNames={['u-align-center']}>
              <Headline modifiers={['xl']} label="Where is my order?" />
              <Headline
                classNames={['u-margin-bottom-xl']}
                label={orderStatus.orderNumber ? `Order number: ${orderStatus.orderNumber}` : ''}
              />
              <OrderConfirmationList step={orderStatus.orderStatus.length}>
                <OrderConfirmationItem
                  icon={<Icon source={orderPlaced} />}
                  title="Order Placed"
                  date={localDate(orderStatus.orderStatus.find(status => status.type === 'placed'))}
                />

                <OrderConfirmationItem
                  icon={<Icon source={orderStarted} />}
                  title="Production started"
                  date={localDate(
                    orderStatus.orderStatus.find(status => status.type === 'in_production')
                  )}
                />

                <OrderConfirmationItem
                  icon={<Icon source={orderShipped} />}
                  title="Order shipped"
                  date={localDate(
                    orderStatus.orderStatus.find(status => status.type === 'shipped')
                  )}
                />

                <OrderConfirmationItem
                  icon={<Icon source={orderReceived} />}
                  title="Order Received"
                  date={localDate(
                    orderStatus.orderStatus.find(status => status.type === 'received')
                  )}
                />
              </OrderConfirmationList>
            </Section>
          )}
          {orderStatus && orderStatus.cancelled && (
            <Section classNames={['u-align-center']}>
              <Headline modifiers={['xl']} label="Your order got cancelled!" />
              <Headline
                label={orderStatus.orderNumber ? `Order number: ${orderStatus.orderNumber}` : ''}
              />
              <Paragraph>Please contact our support team or check your email.</Paragraph>
            </Section>
          )}
          {orderStatusError && (
            <Section classNames={['u-align-center']}>
              <Headline modifiers={['xl']} label="Order not found!" />
              <Paragraph>
                Please contact our support team or check the link in your email.
              </Paragraph>
            </Section>
          )}
          <Section classNames={['u-align-center']}>
            <Headline
              modifiers={['l']}
              classNames={['u-margin-bottom-xl']}
              label="Any questions?"
            />
            <Button minor label="Contact Us" onClick={() => openIntercom()} />
          </Section>
          <Section classNames={['u-align-center']}>
            <Paragraph>
              Or email us at <Link href="mailto:support@all3dp.com" label="support@all3dp.com" />
            </Paragraph>
          </Section>
        </Container>
      )}
    </PageLayout>
  </AppLayout>
)

const enhance = compose(
  scrollToTop(),
  withState('orderStatusError', 'setOrderStatusError', null),
  withState('orderStatus', 'setOrderStatus', null),
  lifecycle({
    componentDidMount() {
      getOrderStatus(this.props.match.params.id)
        .then(orderStatus => {
          this.props.setOrderStatus(orderStatus)
          removeBootsplash()
        })
        .catch(error => {
          this.props.setOrderStatusError(error)
          removeBootsplash()
        })
    }
  })
)

export default enhance(OrderStatusApp)
