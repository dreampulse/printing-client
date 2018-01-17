import React from 'react'
import {storiesOf} from '@storybook/react'

import DeliveryInformation from '../component/delivery-information'

storiesOf('DeliveryInformation', module).add('default', () => (
  <DeliveryInformation duration="3-5 Days" provider="DHL Express" />
))