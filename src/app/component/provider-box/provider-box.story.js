import React from 'react'
import {storiesOf} from '@storybook/react'

import ProviderBox from '.'
import Icon from '../icon'
import Button from '../button'
import DescriptionList from '../description-list'
import ProviderImage from '../provider-image'

import checkoutIcon from '../../../asset/icon/checkout.svg'
import fastestIcon from '../../../asset/icon/fastest.svg'

storiesOf('ProviderBox', module).add('default', () => (
  <ProviderBox
    icon={<Icon source={fastestIcon} />}
    headline="Best Price"
    actionButton={<Button icon={checkoutIcon} label="Add to Basket" />}
    image="http://placehold.it/260x170/cccccc"
    day="10-12 days"
    price={<strong>$350.23</strong>}
    daysColumn={
      <DescriptionList>
        <dt>Production:</dt>
        <dd>8-10 days</dd>
        <dt>Shipping:</dt>
        <dd>2 days</dd>
      </DescriptionList>
    }
    priceColumn={
      <DescriptionList>
        <dt>Production:</dt>
        <dd>8-10 days</dd>
        <dt>Shipping:</dt>
        <dd>2 days</dd>
      </DescriptionList>
    }
    materialColumn={
      <DescriptionList>
        <dt>Material:</dt>
        <dd>Nylon, Strong Flexible Plastic (White)</dd>
        <dt>Process:</dt>
        <dd>MJF</dd>
        <dt>Fulfilled by:</dt>
        <dd>{<ProviderImage modifiers={['xs']} name="imaterialise" slug="imaterialise" />}</dd>
      </DescriptionList>
    }
  />
))
