import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import SelectMenu from 'Component/select-menu'

import {selectMenuValues, selectMenuColorValues, selectMenuMaterialValues} from '../util/data'

storiesOf('Select Menu', module)
  .add('default', () => (
    <SelectMenu values={selectMenuValues} selectedValue="item2" onClick={action('click')} />
  ))
  .add('large', () => (
    <SelectMenu
      modifiers={['l']}
      values={selectMenuValues}
      selectedValue="item2"
      onClick={action('click')}
    />
  ))
  .add('color', () => (
    <SelectMenu values={selectMenuColorValues} selectedValue="item2" onClick={action('click')} />
  ))
  .add('material', () => (
    <SelectMenu
      modifiers={['l']}
      values={selectMenuMaterialValues}
      selectedValue="group1-item2"
      onClick={action('click')}
    />
  ))
