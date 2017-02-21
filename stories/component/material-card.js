import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import MaterialCard from '../../src/app/component/material-card'
import Price from '../../src/app/component/price'
import SelectField from '../../src/app/component/select-field'
import SelectMenu from '../../src/app/component/select-menu'
import Info from '../../src/app/component/info'
import Headline from '../../src/app/component/headline'
import Paragraph from '../../src/app/component/paragraph'

import HandleValue from '../util/handle-value'

const colorValues = [
  {value: 'value1', colorValue: 'ffffff', label: 'Color 1'},
  {value: 'value2', colorValue: 'ff0000', label: 'Color 2'},
  {value: 'value3', colorValue: '00ff00', label: 'Color 3'},
  {value: 'value4', colorValue: '0000ff', label: 'Color 4'},
  {value: 'value5', colorImage: 'http://placehold.it/40x40', label: 'Color 5'}
]

const colorMenu = (<SelectMenu values={colorValues} />)
const price = (<Price value="$19.99" meta="incl. tax & shipping" />)
const colorSelect = (
  <HandleValue>
    <SelectField modifiers={['compact']} placeholder="Placeholder" menu={colorMenu} />
  </HandleValue>
)

const info = (
  <Info>
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
      selected
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
  .add('single color', () => {
    const colorSelectConstant = (
      <SelectField modifiers={['compact']} value={{value: 'item2', colorValue: 'ff0000', label: 'Red'}} />
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
