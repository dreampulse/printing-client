import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import ProviderList from '../../src/app/component/provider-list'
import ProviderItem from '../../src/app/component/provider-item'
import Info from '../../src/app/component/info'
import Headline from '../../src/app/component/headline'
import Paragraph from '../../src/app/component/paragraph'

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
