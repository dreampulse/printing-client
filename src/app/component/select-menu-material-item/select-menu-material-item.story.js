import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import SelectMenuMaterialItem from '.'

storiesOf('Select Menu Material Item', module)
  .add('default', () => (
    <SelectMenuMaterialItem
      value={{
        value: 'value',
        label: 'Select Menu Material Item',
        hasColor: true
      }}
      onClick={action('click')}
    />
  ))
  .add('selected', () => (
    <SelectMenuMaterialItem
      value={{
        value: 'value',
        label: 'Select Menu Material Item',
        hasColor: true
      }}
      selected
      onClick={action('click')}
    />
  ))
