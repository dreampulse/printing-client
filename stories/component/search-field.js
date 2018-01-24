import React from 'react'
import {storiesOf, action} from '@storybook/react'

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
  .add('in radio button group', () => (
    <HandleValue>
      <SearchField modifiers={['in-radio-button-group']} placeholder="Search…" />
    </HandleValue>
  ))
