import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

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

storiesOf('Material Card', module)
  .add('default', () => {
    const price = (<Price value="$19.99" meta="incl. tax & shipping" />)
    const colorSelect = (
      <HandleValue>
        <SelectField modifiers={['compact']} placeholder="Placeholder" menu={colorMenu} />
      </HandleValue>
    )
    return (
      <MaterialCard
        title="Polyamide"
        shipping="2-5 days, no express"
        subline="Solid, raw"
        description="Best all-round material"
        price={price}
        onMoreClick={action('onMoreClick')}
        colorSelect={colorSelect}
        onSelectClick={action('onSelectClick')}
      />
    )
  })
  .add('selected', () => {
    const price = (<Price value="$19.99" meta="incl. tax & shipping" />)
    const colorSelect = (
      <HandleValue>
        <SelectField modifiers={['compact']} placeholder="Placeholder" menu={colorMenu} />
      </HandleValue>
    )
    return (
      <MaterialCard
        selected
        shipping="2-5 days"
        title="Polyamide"
        subline="Solid, raw"
        description="Best all-round material"
        price={price}
        onMoreClick={action('onMoreClick')}
        colorSelect={colorSelect}
        onSelectClick={action('onSelectClick')}
      />
    )
  })
  .add('loading', () => {
    const price = (<Price value="$19.99" meta="incl. tax & shipping" />)
    const colorSelect = (
      <HandleValue>
        <SelectField modifiers={['compact']} placeholder="Placeholder" menu={colorMenu} />
      </HandleValue>
    )
    return (
      <MaterialCard
        selected
        loading
        shipping="2-5 days"
        title="Polyamide"
        subline="Solid, raw"
        description="Best all-round material"
        price={price}
        onMoreClick={action('onMoreClick')}
        colorSelect={colorSelect}
        onSelectClick={action('onSelectClick')}
      />
    )
  })
  .add('single color', () => {
    const price = (<Price value="$19.99" meta="incl. tax & shipping" />)
    const colorSelect = (
      <SelectField modifiers={['compact']} value={{value: 'item2', colorValue: 'ff0000', label: 'Red'}} />
    )
    return (
      <MaterialCard
        selected
        shipping="2-5 days"
        title="Polyamide"
        subline="Solid, raw"
        description="Best all-round material"
        price={price}
        onMoreClick={action('onMoreClick')}
        colorSelect={colorSelect}
        onSelectClick={action('onSelectClick')}
      />
    )
  })
  .add('unavailable', () => {
    const price = (<Price value="$19.99" meta="incl. tax & shipping" />)
    const colorSelect = (
      <SelectField modifiers={['compact']} value={{value: 'item2', colorValue: 'ff0000', label: 'Red'}} />
    )
    return (
      <MaterialCard
        unavailable
        shipping="2-5 days"
        title="Polyamide"
        subline="Solid, raw"
        description="Best all-round material"
        price={price}
        onMoreClick={action('onMoreClick')}
        colorSelect={colorSelect}
        onSelectClick={action('onSelectClick')}
      />
    )
  })
