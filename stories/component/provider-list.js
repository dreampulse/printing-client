import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ProviderList from '../../src/app/component/provider-list'
import ProviderItem from '../../src/app/component/provider-item'

storiesOf('ProviderList & ProviderListItem', module).add('default', () => (
  <ProviderList>
    <ProviderItem
      providerSlug="imaterialise"
      providerName="i.Materialise"
      process="DLS"
      price="$350.23"
      shippingPrice="$20.00"
      deliveryTime="3-4 Days"
      totalPrice="$40.00"
      deliveryProvider="DHL Express"
      providerInfo="Provider Material Name"
      onCheckoutClick={action('click')}
      productionTime="4-6 days"
    />
    <ProviderItem
      providerSlug="sculpteo"
      providerName="Sculpteo"
      process="SLS"
      price="$370.58"
      shippingPrice="$10.00"
      deliveryTime="6-10 Days"
      includesVat
      totalPrice="$40.00"
      deliveryProvider="DHL"
      providerInfo="Provider Material Name"
      onCheckoutClick={action('click')}
      productionTime="6-10 days"
    />
    <ProviderItem
      providerSlug="shapeways"
      providerName="Shapeways"
      process="DLP"
      price="$410.11"
      shippingPrice="$15.00"
      deliveryTime="1-2 Days"
      totalPrice="$40.00"
      deliveryProvider="UPS"
      providerInfo="Provider Material Name"
      onCheckoutClick={action('click')}
      productionTime="4-6 days"
    />
    <ProviderItem
      providerSlug="trinckle"
      providerName="Trinckle"
      process="DLP"
      price="$410.11"
      shippingPrice="$15.00"
      deliveryTime="1-2 Days"
      totalPrice="$40.00"
      deliveryProvider="UPS"
      providerInfo="Provider Material Name"
      onCheckoutClick={action('click')}
      productionTime="4-6 days"
    />
    <ProviderItem
      providerSlug="treatstock"
      providerName="Treatstock"
      process="DLP"
      price="$410.11"
      shippingPrice="$15.00"
      deliveryTime="1-2 Days"
      totalPrice="$40.00"
      deliveryProvider="UPS"
      providerInfo="Provider Material Name"
      onCheckoutClick={action('click')}
      productionTime="4-6 days"
    />
    <ProviderItem
      providerSlug="ff3dm"
      providerName="FF3DM"
      process="DLP"
      price="$410.11"
      shippingPrice="$15.00"
      deliveryTime="1-2 Days"
      totalPrice="$40.00"
      deliveryProvider="UPS"
      providerInfo="Provider Material Name"
      onCheckoutClick={action('click')}
      productionTime="4-6 days"
    />
  </ProviderList>
))
