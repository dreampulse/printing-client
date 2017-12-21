import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import SelectMenuGroupItem from '../../src/app/component/select-menu-group-item'
import {selectMenuGroupItemValue} from '../util/data'

storiesOf('Select Menu Group Item', module).add('default', () => (
  <SelectMenuGroupItem value={selectMenuGroupItemValue} onClick={action('click')} />
))
