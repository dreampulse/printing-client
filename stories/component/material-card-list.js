import React from 'react'
import {storiesOf} from '@storybook/react'

import MaterialCardList from 'Component/material-card-list'
import MaterialCard from 'Component/material-card'
import Price from 'Component/price'
import SelectField from 'Component/select-field'
import SelectMenu from 'Component/select-menu'
import Info from 'Component/info'
import Headline from 'Component/headline'
import Paragraph from 'Component/paragraph'

import HandleValue from '../util/handle-value'

const colorValues = [
  {value: 'value1', colorValue: '#ffffff', label: 'Color 1'},
  {value: 'value2', colorValue: '#ff0000', label: 'Color 2'},
  {value: 'value3', colorValue: '#00ff00', label: 'Color 3'},
  {value: 'value4', colorValue: '#0000ff', label: 'Color 4'},
  {value: 'value5', colorImage: 'http://placehold.it/40x40', label: 'Color 5'}
]

const colorMenu = <SelectMenu values={colorValues} />
const price = <Price value="$19.99" meta="incl. tax & shipping" />
const colorSelect = (
  <HandleValue>
    <SelectField modifiers={['compact']} placeholder="Placeholder" menu={colorMenu} />
  </HandleValue>
)

const info = (
  <Info>
    <Headline modifiers={['s']} label="Headline" />
    <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
  </Info>
)

const card = ({title = 'Polyamide'}) => (
  <MaterialCard
    title={title}
    shipping="2-5 days, no express"
    subline="Solid, raw"
    description="Best all-round material"
    price={price}
    info={info}
    image="http://placehold.it/260x170/cccccc"
    colorSelect={colorSelect}
  />
)

storiesOf('Material Card List', module).add('default', () => (
  <MaterialCardList>
    {card({title: 'Polyamide 1'})}
    {card({title: 'Polyamide 2'})}
    {card({title: 'Polyamide 3'})}
    {card({title: 'Polyamide 4'})}
    {card({title: 'Polyamide 5'})}
    {card({title: 'Polyamide 6'})}
    {card({title: 'Polyamide 7'})}
    {card({title: 'Polyamide 8'})}
  </MaterialCardList>
))
