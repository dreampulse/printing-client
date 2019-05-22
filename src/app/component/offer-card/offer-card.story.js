import React from 'react'
import {storiesOf} from '@storybook/react'

import OfferCard from '.'
import Button from '../button'
import DescriptionList from '../description-list'
import Icon from '../icon'

storiesOf('OfferCard', module).add('default', () => (
  <OfferCard
    icon={<Icon />}
    label="Label"
    mainValue="62.20 €"
    subline="Subline"
    footerContent={
      <DescriptionList>
        <dt>Term:</dt>
        <dd>Value</dd>
        <dt>Term:</dt>
        <dd>Value</dd>
      </DescriptionList>
    }
    action={<Button tiny primary label="Primary Action" />}
  >
    <DescriptionList>
      <dt>
        <em>Term:</em>
      </dt>
      <dd>
        <em>Value</em>
      </dd>
      <dt>Term:</dt>
      <dd>Value</dd>
      <dt>Term:</dt>
      <dd>Value</dd>
    </DescriptionList>
    <DescriptionList>
      <dt>
        <em>Term:</em>
      </dt>
      <dd>
        <em>Value</em>
      </dd>
      <dt>Term:</dt>
      <dd>Value</dd>
      <dt>Term:</dt>
      <dd>Value</dd>
    </DescriptionList>
  </OfferCard>
))
