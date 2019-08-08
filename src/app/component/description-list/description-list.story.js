import React from 'react'
import {storiesOf} from '@storybook/react'

import DescriptionList from '.'
import ProviderImage from '../provider-image'

storiesOf('DescriptionList', module)
  .add('default', () => (
    <DescriptionList>
      <dt>
        <strong>Coffee:</strong>
      </dt>
      <dd>
        <strong>Black hot drink</strong>
      </dd>
      <dt>
        <em>Milk:</em>
      </dt>
      <dd>
        <em>White cold drink</em>
      </dd>
      <dt>Milk:</dt>
      <dd>White cold drink</dd>
      <dt>Milk:</dt>
      <dd>
        <ProviderImage xs name="imaterialise" slug="imaterialise" />
      </dd>
    </DescriptionList>
  ))
  .add('alignRight', () => (
    <DescriptionList alignRight>
      <dt>
        <strong>Coffee:</strong>
      </dt>
      <dd>
        <strong>Black hot drink</strong>
      </dd>
      <dt>
        <em>Milk:</em>
      </dt>
      <dd>
        <em>White cold drink</em>
      </dd>
      <dt>Milk:</dt>
      <dd>White cold drink</dd>
      <dt>Milk:</dt>
      <dd>
        <ProviderImage xs name="imaterialise" slug="imaterialise" />
      </dd>
    </DescriptionList>
  ))
  .add('doubleValues', () => (
    <DescriptionList doubleValues>
      <dt>
        <strong>Coffee:</strong>
      </dt>
      <dd>
        <strong>Black hot drink</strong>
      </dd>
      <dd>
        <strong>Black hot drink</strong>
      </dd>
      <dt>
        <em>Milk:</em>
      </dt>
      <dd>
        <em>White cold drink</em>
      </dd>
      <dd>
        <em>White cold drink</em>
      </dd>
      <dt>Milk:</dt>
      <dd>White cold drink</dd>
      <dd>White cold drink</dd>
      <dt>Milk:</dt>
      <dd>
        <ProviderImage xs name="imaterialise" slug="imaterialise" />
      </dd>
      <dd>
        <ProviderImage xs name="imaterialise" slug="imaterialise" />
      </dd>
    </DescriptionList>
  ))
  .add('topline', () => (
    <DescriptionList topline={<em>Topline</em>}>
      <dt>
        <strong>Coffee:</strong>
      </dt>
      <dd>
        <strong>Black hot drink</strong>
      </dd>
      <dt>
        <em>Milk:</em>
      </dt>
      <dd>
        <em>White cold drink</em>
      </dd>
      <dt>Milk:</dt>
      <dd>White cold drink</dd>
      <dt>Milk:</dt>
      <dd>
        <ProviderImage xs name="imaterialise" slug="imaterialise" />
      </dd>
    </DescriptionList>
  ))
  .add('block', () => (
    <DescriptionList block>
      <dt>
        <strong>Coffee:</strong>
      </dt>
      <dd>
        <strong>Black hot drink</strong>
      </dd>
      <dt>
        <em>Milk:</em>
      </dt>
      <dd>
        <em>White cold drink</em>
      </dd>
      <dt>Milk:</dt>
      <dd>White cold drink</dd>
      <dt>Milk:</dt>
      <dd>
        <ProviderImage xs name="imaterialise" slug="imaterialise" />
      </dd>
    </DescriptionList>
  ))
