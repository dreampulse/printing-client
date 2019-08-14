import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import SelectMenuItem from '.'

storiesOf('SelectMenuItem', module)
  .add('default', () => (
    <SelectMenuItem
      value={{value: 'value', label: 'Select Menu Item'}}
      onClick={action('onClick')}
    />
  ))
  .add('selected', () => (
    <SelectMenuItem
      value={{value: 'value', label: 'Select Menu Item'}}
      selected
      onClick={action('onClick')}
    />
  ))
