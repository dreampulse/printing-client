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
    action={<Button primary label="Primary Action" />}
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
    <DescriptionList doubleValues alignRight>
      <dt>
        <em>Term:</em>
      </dt>
      <dd>
        <em>Value</em>
      </dd>
      <dd>
        <em>Value</em>
      </dd>
      <dt>Term:</dt>
      <dd>Value</dd>
      <dd>Value</dd>
      <dt>Term:</dt>
      <dd>Value</dd>
      <dd>Value</dd>
    </DescriptionList>
  </OfferCard>
))
