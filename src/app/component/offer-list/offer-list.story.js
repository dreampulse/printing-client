import React from 'react'
import {storiesOf} from '@storybook/react'
import {withState} from '@dump247/storybook-state'
import range from 'lodash/range'

import OfferList from '.'
import OfferItem from '../offer-item'
import Button from '../button'
import DescriptionList from '../description-list'

const offerItems = () =>
  range(10).map(i => (
    <OfferItem key={i} actions={<Button primary label="Primary Action" />}>
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

storiesOf('OfferList', module)
  .add('default', () => <OfferList>{offerItems()}</OfferList>)
  .add(
    'showMoreAction',
    withState({showMore: false}, store => (
      <OfferList
        showMore={store.state.showMore}
        showMoreAction={
          <Button minor label="See all offers" onClick={() => store.set({showMore: true})} />
        }
      >
        {offerItems()}
      </OfferList>
    ))
  )
  .add('showMore', () => <OfferList showMore>{offerItems()}</OfferList>)
