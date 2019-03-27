import React from 'react'
import {storiesOf} from '@storybook/react'

import OrderConfirmationItem from '.'
import Icon from '../icon'

import bgMinor from '../../../../stories/decorator/bg-minor'

import orderPlaced from '../../../asset/icon/order-placed.svg'

storiesOf('OrderConfirmationItem', module)
  .addDecorator(bgMinor)
  .add('default', () => (
    <OrderConfirmationItem
      icon={<Icon source={orderPlaced} />}
      title="some title"
      date="some date"
    />
  ))
  .add('active', () => (
    <OrderConfirmationItem
      active
      icon={<Icon source={orderPlaced} />}
      title="some title"
      date="some date"
    />
  ))
