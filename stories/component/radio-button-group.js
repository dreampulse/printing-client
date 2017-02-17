import React from 'react'
import {storiesOf} from '@kadira/storybook'

import RadioButtonGroup from '../../src/app/component/radio-button-group'
import RadioButton from '../../src/app/component/radio-button'

import HandleValue from '../util/handle-value'

storiesOf('Radio Button Group', module)
  .add('default', () => (
    <HandleValue>
      <RadioButtonGroup name="group1">
        <RadioButton value="value1" label="mm" />
        <RadioButton value="value2" label="cm" />
        <RadioButton value="value3" label="in" />
      </RadioButtonGroup>
    </HandleValue>
  ))
  .add('with value', () => (
    <HandleValue initialValue="value1">
      <RadioButtonGroup name="group1">
        <RadioButton value="value1" label="Value 1" />
        <RadioButton value="value2" label="Value 2" />
      </RadioButtonGroup>
    </HandleValue>
  ))
  .add('disabled', () => (
    <HandleValue initialValue="value1">
      <RadioButtonGroup disabled name="group1">
        <RadioButton value="value1" label="Value 1" />
        <RadioButton value="value2" label="Value 2" />
      </RadioButtonGroup>
    </HandleValue>
  ))
