import React from 'react'
import {storiesOf} from '@storybook/react'

import RecommendedOfferSection from '.'
import Button from '../button'
import OfferCard from '../offer-card'
import DescriptionList from '../description-list'
import Icon from '../icon'

const offerCard = () => (
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
)

storiesOf('RecommendedOfferSection', module).add('default', () => (
  <RecommendedOfferSection>
    {offerCard()}
    {offerCard()}
  </RecommendedOfferSection>
))
