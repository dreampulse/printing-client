import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import InputCheckbox from '../../src/app/component/input-checkbox'

storiesOf('Input Checkbox', module)
  .add('default', () => (
    <InputCheckbox onChange={action('onChange')} />
  ))
  .add('checked', () => (
    <InputCheckbox checked />
  ))
  .add('error', () => (
    <InputCheckbox modifiers={['error']} checked />
  ))
