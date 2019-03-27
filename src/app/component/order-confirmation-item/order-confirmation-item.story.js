import React from 'react'
import {storiesOf} from '@storybook/react'

import OrderConfirmationItem from '.'
import Icon from '../icon'

import orderPlaced from '../../../asset/icon/order-placed.svg'

storiesOf('OrderConfirmationItem', module)
  .add('default', () => (
    <OrderConfirmationItem
      icon={<Icon source={orderPlaced} />}
      firstLine="First Line"
      secondLine="Second Line"
    />
  ))
  .add('active', () => (
    <OrderConfirmationItem
      active
      icon={<Icon source={orderPlaced} />}
      firstLine="First Line"
      secondLine="Second Line"
    />
  ))
