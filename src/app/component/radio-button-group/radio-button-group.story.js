import React from 'react'
import {storiesOf} from '@storybook/react'

import RadioButtonGroup from '.'
import RadioButton from '../radio-button'

import HandleValue from '../../../../stories/util/handle-value'

storiesOf('Radio Button Group & Radio Button', module)
  .add('default', () => (
    <HandleValue>
      <RadioButtonGroup name="group1">
        <RadioButton value="value1" label="Value 1" />
        <RadioButton value="value2" label="Value 2" />
        <RadioButton value="value3" label="Value 3" />
      </RadioButtonGroup>
    </HandleValue>
  ))
  .add('tiny', () => (
    <HandleValue>
      <RadioButtonGroup tiny name="group1">
        <RadioButton value="value1" label="Value 1" />
        <RadioButton value="value2" label="Value 2" />
        <RadioButton value="value3" label="Value 3" />
      </RadioButtonGroup>
    </HandleValue>
  ))
  .add('with value', () => (
    <HandleValue initialValue="value1">
      <RadioButtonGroup name="group1">
        <RadioButton value="value1" label="Value 1" />
        <RadioButton value="value2" label="Value 2" />
        <RadioButton value="value3" label="Value 3" />
      </RadioButtonGroup>
    </HandleValue>
  ))
  .add('group disabled', () => (
    <HandleValue initialValue="value1">
      <RadioButtonGroup disabled name="group1">
        <RadioButton value="value1" label="Value 1" />
        <RadioButton value="value2" label="Value 2" />
        <RadioButton value="value3" label="Value 3" />
      </RadioButtonGroup>
    </HandleValue>
  ))
  .add('individual button disabled', () => (
    <HandleValue initialValue="value1">
      <RadioButtonGroup name="group1">
        <RadioButton value="value1" label="Value 1" />
        <RadioButton disabled value="value2" label="Value 2" />
        <RadioButton value="value3" label="Value 3" />
      </RadioButtonGroup>
    </HandleValue>
  ))
