import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import SelectMenu from '.'

import {selectMenuValues} from '../../../../stories/util/data'

storiesOf('SelectMenu', module).add('default', () => (
  <SelectMenu values={selectMenuValues} selectedValue="item2" onClick={action('onClick')} />
))
