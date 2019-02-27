import React from 'react'
import {storiesOf} from '@storybook/react'
import {withState} from '@dump247/storybook-state'
import range from 'lodash/range'

import OfferFooter from '.'
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

storiesOf('OfferFooter', module)
  .add(
    'default',
    withState({showMore: false}, store => (
      <OfferFooter showMore={store.state.showMore}>
        <OfferItem
          actions={
            <>
              {!store.state.showMore && (
                <Button text label="See all offers" onClick={() => store.set({showMore: true})} />
              )}
              <Button primary label="Primary Action" />
            </>
          }
        >
          <DescriptionList>
            <dt>
              <strong>Term:</strong>
            </dt>
            <dd>
              <strong className="u-font-size-l">Value</strong>
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
              <strong className="u-font-size-l">Value</strong>
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
        {offerItems()}
      </OfferFooter>
    ))
  )
  .add('showMore', () => (
    <OfferFooter showMore>
      <OfferItem actions={<Button primary label="Primary Action" />}>
        <DescriptionList>
          <dt>
            <strong>Term:</strong>
          </dt>
          <dd>
            <strong className="u-font-size-l">Value</strong>
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
            <strong className="u-font-size-l">Value</strong>
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
      {offerItems()}
    </OfferFooter>
  ))
