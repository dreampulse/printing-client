import React from 'react'
import {storiesOf} from '@storybook/react'

import ProviderBoxSection from '.'
import Icon from '../icon'
import Button from '../button'
import ProviderBox from '../provider-box'
import ProviderImage from '../provider-image'
import DescriptionList from '../description-list'

import checkoutIcon from '../../../asset/icon/checkout.svg'
import fastestIcon from '../../../asset/icon/fastest.svg'
import cheapestIcon from '../../../asset/icon/cheapest.svg'

storiesOf('ProviderBoxSection', module).add('default', () => (
  <ProviderBoxSection>
    <ProviderBox
      icon={<Icon source={cheapestIcon} />}
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
          <dd>$345.23</dd>
          <dt>Shipping:</dt>
          <dd>$5.00</dd>
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
    <ProviderBox
      icon={<Icon source={fastestIcon} />}
      headline="Express"
      actionButton={<Button icon={checkoutIcon} label="Add to Basket" />}
      image="http://placehold.it/260x170/cccccc"
      day={<strong>10-12 days</strong>}
      price="$350.23"
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
          <dd>$345.23</dd>
          <dt>Shipping:</dt>
          <dd>$5.00</dd>
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
  </ProviderBoxSection>
))
