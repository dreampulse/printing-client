import React from 'react'
import {storiesOf} from '@storybook/react'

import SelectMenu from '../../src/app/component/select-menu'
import SelectField from '../../src/app/component/select-field'

import HandleValue from '../util/handle-value'
import {selectMenuValues, selectMenuColorValues, selectMenuMaterialValues} from '../util/data'

const menu = <SelectMenu values={selectMenuValues} />
const colorMenu = <SelectMenu values={selectMenuColorValues} />
const materialMenu = <SelectMenu modifiers={['l']} values={selectMenuMaterialValues} />

storiesOf('Select Field', module)
  .add('default', () => (
    <HandleValue>
      <SelectField placeholder="Placeholder" menu={menu} />
    </HandleValue>
  ))
  .add('opens to top', () => (
    <HandleValue>
      <div style={{bottom: 0, position: 'absolute', width: '100%'}}>
        <SelectField placeholder="Placeholder" menu={menu} />
      </div>
    </HandleValue>
  ))
  .add('selected', () => (
    <HandleValue initialValue={{value: 'item2', label: 'Select Menu Item 2'}}>
      <SelectField placeholder="Placeholder" menu={menu} />
    </HandleValue>
  ))
  .add('with color', () => (
    <HandleValue>
      <SelectField placeholder="Placeholder" menu={colorMenu} />
    </HandleValue>
  ))
  .add('compact', () => (
    <HandleValue>
      <SelectField modifiers={['compact']} placeholder="Placeholder" menu={colorMenu} />
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
      <SelectField placeholder="Placeholder" menu={materialMenu} />
    </HandleValue>
  ))
  .add('disabled', () => (
    <HandleValue>
      <SelectField placeholder="Placeholder" menu={menu} disabled />
    </HandleValue>
  ))
