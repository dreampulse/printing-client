import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import range from 'lodash/range'

import SelectMenu from '../../src/app/component/select-menu'

const values = range(1, 10)
  .map(i => ({value: `item${i}`, label: `Select Menu Item ${i}`}))

const colorValues = [
  {value: 'item1', colorValue: 'ffffff', label: 'Color 1'},
  {value: 'item2', colorValue: 'ff0000', label: 'Color 2'},
  {value: 'item3', colorValue: '00ff00', label: 'Color 3'},
  {value: 'item4', colorValue: '0000ff', label: 'Color 4'},
  {value: 'item5', colorImage: 'http://placehold.it/40x40', label: 'Color 5'}
]

const materialChildren = prefix => range(1, 10)
  .map(i => ({
    type: 'material',
    value: `${prefix}-item${i}`,
    label: `Select Menu Item ${i}`,
    hasColor: true,
    price: 'From $19.99'
  }))
const materialValues = [{
  value: 'regular-item1',
  label: 'Regular Item'
}, {
  type: 'group',
  label: 'Group Item 1',
  children: materialChildren('group1')
}, {
  type: 'group',
  label: 'Group Item 2',
  children: materialChildren('group2')
}]

storiesOf('Select Menu', module)
  .add('default', () => (
    <SelectMenu
      values={values}
      selectedValue="item2"
      onClick={action('click')}
    />
  ))
  .add('large', () => (
    <SelectMenu
      modifiers={['l']}
      values={values}
      selectedValue="item2"
      onClick={action('click')}
    />
  ))
  .add('color', () => (
    <SelectMenu
      values={colorValues}
      selectedValue="item2"
      onClick={action('click')}
    />
  ))
  .add('material', () => (
    <SelectMenu
      modifiers={['l']}
      values={materialValues}
      selectedValue="group1-item2"
      onClick={action('click')}
    />
  ))
