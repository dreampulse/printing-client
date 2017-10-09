import React from 'react'
import {storiesOf, action} from '@storybook/react'

import SelectMenuGroupItem from 'Component/select-menu-group-item'
import {selectMenuGroupItemValue} from '../util/data'

storiesOf('Select Menu Group Item', module)
  .add('default', () => (
    <SelectMenuGroupItem
      value={selectMenuGroupItemValue}
      onClick={action('click')}
    />
  ))
