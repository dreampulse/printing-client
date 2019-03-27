import React from 'react'
import {storiesOf} from '@storybook/react'

import OrderConfirmationList from '.'
import Icon from '../icon'
import OrderConfirmationItem from '../order-confirmation-item'

import bgMinor from '../../../../stories/decorator/bg-minor'

import orderPlaced from '../../../asset/icon/order-placed.svg'
import orderStarted from '../../../asset/icon/order-started.svg'
import orderShipped from '../../../asset/icon/order-shipped.svg'
import orderReceived from '../../../asset/icon/order-received.svg'

const items = [
  <OrderConfirmationItem
    key="orderPlaced"
    icon={<Icon source={orderPlaced} />}
    firstLine="Order Placed"
    secondLine="1th Jan 2000"
  />,
  <OrderConfirmationItem
    key="orderStarted"
    icon={<Icon source={orderStarted} />}
    firstLine="Order Started"
    secondLine="1th Jan 2000"
  />,
  <OrderConfirmationItem
    key="orderShipped"
    icon={<Icon source={orderShipped} />}
    firstLine="Order Shipped"
    secondLine="1th Jan 2000"
  />,
  <OrderConfirmationItem
    key="orderReceived"
    icon={<Icon source={orderReceived} />}
    firstLine="Order Received"
    secondLine="1th Jan 2000"
  />
]

storiesOf('OrderConfirmationList', module)
  .addDecorator(bgMinor)
  .add('default', () => <OrderConfirmationList>{items}</OrderConfirmationList>)
  .add('step1', () => <OrderConfirmationList step={1}>{items}</OrderConfirmationList>)
  .add('step2', () => <OrderConfirmationList step={2}>{items}</OrderConfirmationList>)
  .add('step3', () => <OrderConfirmationList step={3}>{items}</OrderConfirmationList>)
  .add('step4', () => <OrderConfirmationList step={4}>{items}</OrderConfirmationList>)
