import React from 'react'
import {storiesOf} from '@storybook/react'

import DescriptionList from '.'
import Link from '../link'

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
        <Link label="iMaterialise" />
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
        <Link label="iMaterialise" />
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
        <Link label="iMaterialise" />
      </dd>
      <dd>
        <Link label="iMaterialise" />
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
        <Link label="iMaterialise" />
      </dd>
    </DescriptionList>
  ))
