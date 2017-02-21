import React, {cloneElement} from 'react'
import {storiesOf} from '@kadira/storybook'

import MaterialCardList from '../../src/app/component/material-card-list'
import MaterialCard from '../../src/app/component/material-card'
import Price from '../../src/app/component/price'
import SelectField from '../../src/app/component/select-field'
import SelectMenu from '../../src/app/component/select-menu'

import HandleValue from '../util/handle-value'

const colorValues = [
  {value: 'value1', colorValue: 'ffffff', label: 'Color 1'},
  {value: 'value2', colorValue: 'ff0000', label: 'Color 2'},
  {value: 'value3', colorValue: '00ff00', label: 'Color 3'},
  {value: 'value4', colorValue: '0000ff', label: 'Color 4'},
  {value: 'value5', colorImage: 'http://placehold.it/40x40', label: 'Color 5'}
]

const colorMenu = <SelectMenu values={colorValues} />

const price = (<Price value="$19.99" meta="incl. tax & shipping" />)
const colorSelect = (
  <HandleValue>
    <SelectField modifiers={['compact']} placeholder="Placeholder" menu={colorMenu} />
  </HandleValue>
)

const card = (
  <MaterialCard
    title="Polyamide"
    shipping="2-5 days, no express"
    subline="Solid, raw"
    description="Best all-round material"
    price={price}
    colorSelect={colorSelect}
  />
)

storiesOf('Material Card List', module)
  .add('default', () => (
    <div>
      <MaterialCardList>
        {cloneElement(card, {title: 'Polyamide 1'})}
        {cloneElement(card, {title: 'Polyamide 2'})}
        {cloneElement(card, {title: 'Polyamide 3', loading: true})}
        {cloneElement(card, {title: 'Polyamide 4'})}
        {cloneElement(card, {title: 'Polyamide 5', selected: true})}
        {cloneElement(card, {title: 'Polyamide 6'})}
        {cloneElement(card, {title: 'Polyamide 7', unavailable: true})}
        {cloneElement(card, {title: 'Polyamide 8'})}
      </MaterialCardList>
      <div>asdfasdf</div>
    </div>
  ))
