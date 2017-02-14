import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import InputCheckbox from '../../src/app/component/input-checkbox'
import HandleChecked from '../util/handle-checked'

storiesOf('Input Checkbox', module)
  .add('default', () => (
    <HandleChecked>
      <InputCheckbox onChange={action('onChange')} />
    </HandleChecked>
  ))
  .add('checked', () => (
    <HandleChecked initialChecked>
      <InputCheckbox checked />
    </HandleChecked>
  ))
  .add('error', () => (
    <HandleChecked initialChecked>
      <InputCheckbox modifiers={['error']} checked />
    </HandleChecked>
  ))
