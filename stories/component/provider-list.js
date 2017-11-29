import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ProviderList from 'Component/provider-list'
import ProviderItem from 'Component/provider-item'
import Info from 'Component/info'
import Headline from 'Component/headline'
import Paragraph from 'Component/paragraph'

const providerInfo = (
  <Info modifiers={['minor']}>
    <Headline modifiers={['s']} label="Headline" />
    <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
  </Info>
)

storiesOf('Provider List & Provider Item', module).add('default', () => (
  <ProviderList>
    <ProviderItem
      provider="imaterialise"
      process="DLS"
      price="$350.23"
      shipping="$20.00"
      deliveryTime="3-4 Days"
      deliveryProvider="DHL Express"
      providerInfo={providerInfo}
      onCheckoutClick={action('click')}
    />
    <ProviderItem
      provider="sculpteo"
      process="SLS"
      price="$370.58"
      shipping="$10.00"
      deliveryTime="6-10 Days"
      deliveryProvider="DHL"
      providerInfo={providerInfo}
      onCheckoutClick={action('click')}
    />
    <ProviderItem
      provider="shapeways"
      process="DLP"
      price="$410.11"
      shipping="$15.00"
      deliveryTime="1-2 Days"
      deliveryProvider="UPS"
      providerInfo={providerInfo}
      onCheckoutClick={action('click')}
    />
  </ProviderList>
))
