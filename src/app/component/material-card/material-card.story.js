import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import MaterialCard from '.'
import Price from '../price'
import Info from '../info'
import Headline from '../headline'
import Paragraph from '../paragraph'

const price = <Price value="$19.99" />

const info = (
  <Info modifiers={['minor']}>
    <Headline label="Headline" />
    <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
  </Info>
)

storiesOf('MaterialCard', module)
  .add('default', () => (
    <MaterialCard
      title="Polyamide"
      descriptionHeadline="Best used for:"
      description="Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/cccccc"
      onMoreClick={action('onMoreClick')}
      onSelectClick={action('onSelectClick')}
    />
  ))
  .add('without image', () => (
    <MaterialCard
      title="Polyamide"
      description="Best all-round material"
      price={price}
      info={info}
      onMoreClick={action('onMoreClick')}
      onSelectClick={action('onSelectClick')}
    />
  ))
  .add('loading', () => (
    <MaterialCard
      loading
      title="Polyamide"
      description="Best all-round material. Best all-round material. Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/cccccc"
      onMoreClick={action('onMoreClick')}
      onSelectClick={action('onSelectClick')}
    />
  ))
  .add('unavailable', () => (
    <MaterialCard
      unavailable
      title="Polyamide"
      description="Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/cccccc"
      onMoreClick={action('onMoreClick')}
      onSelectClick={action('onSelectClick')}
      onUnavailableClick={action('onUnavailableClick')}
    />
  ))
