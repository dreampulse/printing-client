import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import LabledCheckbox from '../../src/app/component/labled-checkbox'
import HandleValue from '../util/handle-value'

storiesOf('Labled Checkbox', module)
  .add('default', () => (
    <LabledCheckbox label="Label" onChange={action('onChange')} />
  ))
  .add('checked', () => (
    <LabledCheckbox checked label="Label" />
  ))
  .add('error', () => (
    <LabledCheckbox modifiers={['error']} checked label="Label" />
  ))
