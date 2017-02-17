import React from 'react'
import {storiesOf} from '@kadira/storybook'

import RadioButtonGroup from '../../src/app/component/radio-button-group'
import RadioButton from '../../src/app/component/radio-button'

import HandleValue from '../util/handle-value'

storiesOf('Radio Button', module)
  .add('default', () => (
    <HandleValue>
      <RadioButtonGroup name="group1">
        <RadioButton value="value1" label="mm" />
        <RadioButton value="value2" label="cm" />
        <RadioButton value="value3" label="in" />
      </RadioButtonGroup>
    </HandleValue>
  ))
  .add('disabled', () => (
    <HandleValue>
      <RadioButtonGroup name="group1">
        <RadioButton value="value1" label="Value 1" disabled />
        <RadioButton value="value2" label="Value 2" />
        <RadioButton value="value3" label="Value 3" />
      </RadioButtonGroup>
    </HandleValue>
  ))
