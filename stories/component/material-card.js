import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import MaterialCard from 'Component/material-card'
import Price from 'Component/price'
import SelectField from 'Component/select-field'
import SelectMenu from 'Component/select-menu'
import Info from 'Component/info'
import Headline from 'Component/headline'
import Paragraph from 'Component/paragraph'

import HandleValue from '../util/handle-value'
import {selectMenuColorValues} from '../util/data'

const colorMenu = (<SelectMenu values={selectMenuColorValues} />)
const price = (<Price value="$19.99" meta="incl. tax & shipping" />)
const colorSelect = (
  <HandleValue>
    <SelectField modifiers={['compact']} placeholder="Placeholder" menu={colorMenu} />
  </HandleValue>
)

const info = (
  <Info modifiers={['minor']}>
    <Headline modifiers={['s']} label="Headline" />
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit
    </Paragraph>
  </Info>
)

storiesOf('Material Card', module)
  .add('default', () => (
    <MaterialCard
      title="Polyamide"
      shipping="2-5 days, no express"
      subline="Solid, raw"
      description="Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/ff0000"
      onMoreClick={action('onMoreClick')}
      colorSelect={colorSelect}
      onSelectClick={action('onSelectClick')}
    />
  ))
  .add('without image', () => (
    <MaterialCard
      title="Polyamide"
      shipping="2-5 days, no express"
      subline="Solid, raw"
      description="Best all-round material"
      price={price}
      info={info}
      onMoreClick={action('onMoreClick')}
      colorSelect={colorSelect}
      onSelectClick={action('onSelectClick')}
    />
  ))
  .add('alternative label', () => (
    <MaterialCard
      title="Polyamide"
      shipping="2-5 days, no express"
      subline="Solid, raw"
      description="Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/ff0000"
      onMoreClick={action('onMoreClick')}
      colorSelect={colorSelect}
      onSelectClick={action('onSelectClick')}
      selectLabel="Checkout"
    />
  ))
  .add('selected', () => (
    <MaterialCard
      selected
      shipping="2-5 days"
      title="Polyamide"
      subline="Solid, raw"
      description="Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/ff0000"
      onMoreClick={action('onMoreClick')}
      colorSelect={colorSelect}
      onSelectClick={action('onSelectClick')}
    />
  ))
  .add('loading', () => (
    <MaterialCard
      loading
      shipping="2-5 days"
      title="Polyamide"
      subline="Solid, raw"
      description="Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/ff0000"
      onMoreClick={action('onMoreClick')}
      colorSelect={colorSelect}
      onSelectClick={action('onSelectClick')}
    />
  ))
  .add('disabled button', () => (
    <MaterialCard
      loading
      shipping="2-5 days"
      title="Polyamide"
      subline="Solid, raw"
      description="Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/ff0000"
      colorSelect={colorSelect}
      onMoreClick={action('onMoreClick')}
    />
  ))
  .add('single color', () => {
    const colorSelectConstant = (
      <SelectField modifiers={['compact']} value={selectMenuColorValues[0]} />
    )
    return (
      <MaterialCard
        shipping="2-5 days"
        title="Polyamide"
        subline="Solid, raw"
        description="Best all-round material"
        price={price}
        info={info}
        image="http://placehold.it/260x170/ff0000"
        onMoreClick={action('onMoreClick')}
        colorSelect={colorSelectConstant}
        onSelectClick={action('onSelectClick')}
      />
    )
  })
  .add('unavailable', () => (
    <MaterialCard
      unavailable
      shipping="2-5 days"
      title="Polyamide"
      subline="Solid, raw"
      description="Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/ff0000"
      onMoreClick={action('onMoreClick')}
      colorSelect={colorSelect}
      onSelectClick={action('onSelectClick')}
    />
  ))
