import React from 'react'
import {storiesOf} from '@kadira/storybook'
import range from 'lodash/range'

import HandleValue from '../util/handle-value'
import SelectMenu from '../../src/app/component/select-menu'
import SelectField from '../../src/app/component/select-field'

const values = range(1, 10)
  .map(i => ({value: `item${i}`, label: `Select Menu Item ${i}`}))

const colorValues = [
  {value: 'value1', colorValue: 'ffffff', label: 'Color 1'},
  {value: 'value2', colorValue: 'ff0000', label: 'Color 2'},
  {value: 'value3', colorValue: '00ff00', label: 'Color 3'},
  {value: 'value4', colorValue: '0000ff', label: 'Color 4'},
  {value: 'value5', colorImage: 'http://placehold.it/40x40', label: 'Color 5'}
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

const menu = <SelectMenu values={values} />
const colorMenu = <SelectMenu values={colorValues} />
const materialMenu = <SelectMenu modifiers={['l']} values={materialValues} />

storiesOf('Select Field', module)
  .add('default', () => (
    <HandleValue>
      <SelectField
        placeholder="Placeholder"
        menu={menu}
      />
    </HandleValue>
  ))
  .add('opens to top', () => (
    <HandleValue>
      <div style={{bottom: 0, position: 'absolute', width: '100%'}}>
        <SelectField
          placeholder="Placeholder"
          menu={menu}
        />
      </div>
    </HandleValue>
  ))
  .add('selected', () => (
    <HandleValue initialValue={{value: 'item2', label: 'Select Menu Item 2'}}>
      <SelectField
        placeholder="Placeholder"
        menu={menu}
      />
    </HandleValue>
  ))
  .add('with color', () => (
    <HandleValue>
      <SelectField
        placeholder="Placeholder"
        menu={colorMenu}
      />
    </HandleValue>
  ))
  .add('compact', () => (
    <HandleValue>
      <SelectField
        modifiers={['compact']}
        placeholder="Placeholder"
        menu={colorMenu}
      />
    </HandleValue>
  ))
  .add('constant', () => (
    <SelectField
      modifiers={['compact']}
      value={{value: 'item2', colorValue: 'ff0000', label: 'Constant Select Field'}}
    />
  ))
  .add('material', () => (
    <HandleValue>
      <SelectField
        placeholder="Placeholder"
        menu={materialMenu}
      />
    </HandleValue>
  ))
