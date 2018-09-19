import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import SelectMenuGroupItem from '.'

import {selectMenuGroupItemValue} from '../../../../stories/util/data'

storiesOf('Select Menu Group Item', module).add('default', () => (
  <SelectMenuGroupItem value={selectMenuGroupItemValue} onClick={action('click')} />
))
