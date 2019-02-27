import React from 'react'
import {storiesOf} from '@storybook/react'

import OfferItem from '.'
import Button from '../button'
import DescriptionList from '../description-list'

storiesOf('OfferItem', module).add('default', () => (
  <OfferItem
    actions={
      <>
        <Button text label="Secondary Action" />
        <Button primary label="Primary Action" />
      </>
    }
  >
    <DescriptionList>
      <dt>
        <strong>Term:</strong>
      </dt>
      <dd>
        <strong>Value</strong>
      </dd>
      <dt>Term:</dt>
      <dd>Value</dd>
      <dt>Term:</dt>
      <dd>Value</dd>
    </DescriptionList>
    <DescriptionList>
      <dt>
        <strong>Term:</strong>
      </dt>
      <dd>
        <strong>Value</strong>
      </dd>
      <dt>Term:</dt>
      <dd>Value</dd>
      <dt>Term:</dt>
      <dd>Value</dd>
    </DescriptionList>
    <DescriptionList>
      <dt>Term:</dt>
      <dd>Value</dd>
      <dt>Term:</dt>
      <dd>Value</dd>
    </DescriptionList>
  </OfferItem>
))
