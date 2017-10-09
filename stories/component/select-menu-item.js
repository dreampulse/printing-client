import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import SelectMenuItem from 'Component/select-menu-item'

storiesOf('Select Menu Item', module)
  .add('default', () => (
    <SelectMenuItem
      value={{value: 'value', label: 'Select Menu Item'}}
      onClick={action('click')}
    />
  ))
  .add('selected', () => (
    <SelectMenuItem
      value={{value: 'value', label: 'Select Menu Item'}}
      selected
      onClick={action('click')}
    />
  ))
  .add('color value', () => (
    <SelectMenuItem
      modifiers={['color']}
      value={{value: 'value', label: 'Select Menu Item', colorValue: 'ff0000'}}
      selected
      onClick={action('click')}
    />
  ))
  .add('color image', () => (
    <SelectMenuItem
      modifiers={['color']}
      value={{value: 'value', label: 'Select Menu Item', colorImage: 'http://placehold.it/40x40'}}
      selected
      onClick={action('click')}
    />
  ))
