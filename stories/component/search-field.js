import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import SearchField from '../../src/app/component/search-field'
import HandleValue from '../util/handle-value'

storiesOf('Search Field', module)
  .add('default', () => (
    <HandleValue>
      <SearchField placeholder="Search…" onClearClick={action('clear click')} />
    </HandleValue>
  ))
  .add('disabled', () => (
    <HandleValue>
      <SearchField placeholder="Search…" disabled />
    </HandleValue>
  ))
