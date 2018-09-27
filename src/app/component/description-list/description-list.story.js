import React from 'react'
import {storiesOf} from '@storybook/react'

import DescriptionList from '.'

storiesOf('DescriptionList', module)
  .add('default', () => (
    <DescriptionList>
      <dt>Coffee:</dt>
      <dd>Black hot drink</dd>
      <dt>Milk:</dt>
      <dd>White cold drink</dd>
    </DescriptionList>
  ))
  .add('align-right', () => (
    <DescriptionList modifiers={['align-right']}>
      <dt>Coffee:</dt>
      <dd>Black hot drink</dd>
      <dt>Milk:</dt>
      <dd>White cold drink</dd>
    </DescriptionList>
  ))
