import React, {Fragment} from 'react'
import {storiesOf} from '@storybook/react'

import checkoutIcon from '../../../asset/icon/checkout.svg'

import ProviderList from '.'
import ProviderItem from '../provider-item'
import DescriptionList from '../description-list'
import ProviderImage from '../provider-image'
import Button from '../button'
import Icon from '../icon'

storiesOf('ProviderList & ProviderListItem', module).add('default', () => (
  <ProviderList>
    <ProviderItem
      providerAnnotation={
        <DescriptionList>
          <dt>Material:</dt>
          <dd>Strong Flexible Plastic</dd>
          <dt>Process:</dt>
          <dd>MJF</dd>
        </DescriptionList>
      }
      provider={<ProviderImage modifiers={['s']} name="imaterialise" slug="imaterialise" />}
      timeAnnotation={
        <DescriptionList>
          <dt>Production:</dt>
          <dd>8-10 days</dd>
          <dt>Shipping:</dt>
          <dd>2 days</dd>
        </DescriptionList>
      }
      time="10-12 days"
      priceAnnotation={
        <DescriptionList>
          <dt>Production:</dt>
          <dd>$10.00</dd>
          <dt>Shipping:</dt>
          <dd>$4.90</dd>
        </DescriptionList>
      }
      price={<strong>$350.23</strong>}
      action={<Button modifiers={['minor']} icon={checkoutIcon} label="Add to Basket" />}
      icons={
        <Fragment>
          <Icon />
          <Icon />
        </Fragment>
      }
    />
    <ProviderItem
      providerAnnotation={
        <DescriptionList>
          <dt>Material:</dt>
          <dd>Strong Flexible Plastic</dd>
          <dt>Process:</dt>
          <dd>MJF</dd>
        </DescriptionList>
      }
      provider={<ProviderImage modifiers={['s']} name="shapeways" slug="shapeways" />}
      timeAnnotation={
        <DescriptionList>
          <dt>Production:</dt>
          <dd>3-4 days</dd>
          <dt>Shipping:</dt>
          <dd>2 days</dd>
        </DescriptionList>
      }
      time={<strong>5-6 days</strong>}
      priceAnnotation={
        <DescriptionList>
          <dt>Production:</dt>
          <dd>$10.00</dd>
          <dt>Shipping:</dt>
          <dd>$4.90</dd>
        </DescriptionList>
      }
      price="$350.23"
      action={<Button modifiers={['minor']} icon={checkoutIcon} label="Add to Basket" />}
      icons={<Icon />}
    />
  </ProviderList>
))
