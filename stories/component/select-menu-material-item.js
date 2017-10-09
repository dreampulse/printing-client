import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import SelectMenuMaterialItem from 'Component/select-menu-material-item'

storiesOf('Select Menu Material Item', module)
  .add('default', () => (
    <SelectMenuMaterialItem
      value={{
        value: 'value',
        label: 'Select Menu Material Item',
        hasColor: true,
        price: 'From $19.99'
      }}
      onClick={action('click')}
    />
  ))
  .add('selected', () => (
    <SelectMenuMaterialItem
      value={{
        value: 'value',
        label: 'Select Menu Material Item',
        hasColor: true,
        price: 'From $19.99'
      }}
      selected
      onClick={action('click')}
    />
  ))
