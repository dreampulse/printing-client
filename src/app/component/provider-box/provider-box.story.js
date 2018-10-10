import React from 'react'
import {storiesOf} from '@storybook/react'

import ProviderBox from '.'
import Icon from '../icon'
import Button from '../button'
import DescriptionList from '../description-list'

import checkoutIcon from '../../../asset/icon/checkout.svg'
import fastestIcon from '../../../asset/icon/fastest.svg'

storiesOf('ProviderBox', module).add('default', () => (
  <ProviderBox
    icon={<Icon source={fastestIcon} />}
    headline="The cheapest"
    actionButton={<Button modifiers={['warning']} icon={checkoutIcon} label="Add to Basked" />}
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
        <dt>Fulfilled by:</dt>
        <dd>i.Materialise</dd>
        <dt>Material:</dt>
        <dd>Strong Flexible Plastic</dd>
        <dt>Process:</dt>
        <dd>MJF</dd>
      </DescriptionList>
    }
  />
))
