import React from 'react'
import {storiesOf} from '@storybook/react'

import SelectField from '.'
import SelectMenu from '../select-menu'

import HandleValue from '../../../../stories/util/handle-value'
import {selectMenuValues, selectMenuMaterialValues} from '../../../../stories/util/data'

const menu = <SelectMenu values={selectMenuValues} />
const materialMenu = <SelectMenu modifiers={['l']} values={selectMenuMaterialValues} />

storiesOf('SelectField', module)
  .add('default', () => (
    <HandleValue>
      <SelectField placeholder="Placeholder" menu={menu} />
    </HandleValue>
  ))
  .add('opens to top', () => (
    <div style={{position: 'relative', height: '100vh'}}>
      <div style={{bottom: 0, position: 'absolute', width: '100%'}}>
        <HandleValue>
          <SelectField placeholder="Placeholder" menu={menu} />
        </HandleValue>
      </div>
    </div>
  ))
  .add('selected', () => (
    <HandleValue initialValue={{value: 'item2', label: 'Select Menu Item 2'}}>
      <SelectField placeholder="Placeholder" menu={menu} />
    </HandleValue>
  ))
  .add('compact', () => (
    <HandleValue>
      <SelectField compact placeholder="Placeholder" menu={menu} />
    </HandleValue>
  ))
  .add('constant', () => (
    <SelectField
      compact
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
  .add('error', () => (
    <HandleValue>
      <SelectField error placeholder="Placeholder" menu={menu} />
    </HandleValue>
  ))
  .add('warning', () => (
    <HandleValue>
      <SelectField warning placeholder="Placeholder" menu={menu} />
    </HandleValue>
  ))
