import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ProviderList from '../../src/app/component/provider-list'
import ProviderItem from '../../src/app/component/provider-item'
import Info from '../../src/app/component/info'
import Headline from '../../src/app/component/headline'
import Paragraph from '../../src/app/component/paragraph'

const providerInfo = (
  <Info modifiers={['minor']}>
    <Headline modifiers={['s']} label="Headline" />
    <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
  </Info>
)

storiesOf('Provider List & Provider Item', module).add('default', () => (
  <ProviderList>
    <ProviderItem
      providerSlug="imaterialise"
      providerName="i.Materialise"
      process="DLS"
      price="$350.23"
      shippingPrice="$20.00"
      deliveryTime="3-4 Days"
      deliveryProvider="DHL Express"
      providerInfo={providerInfo}
      onCheckoutClick={action('click')}
    />
    <ProviderItem
      providerSlug="sculpteo"
      providerName="Sculpteo"
      process="SLS"
      price="$370.58"
      shippingPrice="$10.00"
      deliveryTime="6-10 Days"
      deliveryProvider="DHL"
      providerInfo={providerInfo}
      onCheckoutClick={action('click')}
    />
    <ProviderItem
      providerSlug="shapeways"
      providerName="Shapeways"
      process="DLP"
      price="$410.11"
      shippingPrice="$15.00"
      deliveryTime="1-2 Days"
      deliveryProvider="UPS"
      providerInfo={providerInfo}
      onCheckoutClick={action('click')}
    />
  </ProviderList>
))
