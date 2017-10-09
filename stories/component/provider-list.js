import React from 'react'
import {storiesOf, action} from '@storybook/react'

import ProviderList from 'Component/provider-list'
import ProviderItem from 'Component/provider-item'
import Info from 'Component/info'
import Headline from 'Component/headline'
import Paragraph from 'Component/paragraph'

const providerInfo = (
  <Info>
    <Headline modifiers={['s']} label="Headline" />
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit
    </Paragraph>
  </Info>
)

storiesOf('Provider List & Provider Item', module)
  .add('default', () => (
    <ProviderList providerInfo={providerInfo}>
      <ProviderItem provider="imaterialise" price="$350.23" deliveryTime="3-4 Days" onCheckoutClick={action('click')} />
      <ProviderItem provider="sculpteo" price="$370.58" deliveryTime="6-10 Days" onCheckoutClick={action('click')} />
      <ProviderItem provider="shapeways" price="$410.11" deliveryTime="1-2 Days" onCheckoutClick={action('click')} />
    </ProviderList>
  ))
