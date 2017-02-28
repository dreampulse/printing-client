import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import {selectMenuGroupItemValue} from '../util/data'

import SelectMenuGroupItem from 'Component/select-menu-group-item'

storiesOf('Select Menu Group Item', module)
  .add('default', () => (
    <SelectMenuGroupItem
      value={selectMenuGroupItemValue}
      onClick={action('click')}
    />
  ))
