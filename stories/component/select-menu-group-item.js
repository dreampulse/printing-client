import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import range from 'lodash/range'

import SelectMenuGroupItem from '../../src/app/component/select-menu-group-item'

const children = range(1, 10)
  .map(i => ({
    type: 'material',
    value: `item${i}`,
    label: `Select Menu Item ${i}`,
    hasColor: true,
    price: 'From $19.99'
  }))
const value = {
  type: 'group',
  label: 'Select Menu Group Item',
  children
}

storiesOf('Select Menu Group Item', module)
  .add('default', () => (
    <SelectMenuGroupItem
      value={value}
      onClick={action('click')}
    />
  ))
