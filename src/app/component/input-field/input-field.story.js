import React from 'react'
import {storiesOf} from '@storybook/react'

import InputField from '.'

import HandleValue from '../../../../stories/util/handle-value'

storiesOf('Input Field', module)
  .add('default', () => (
    <HandleValue>
      <InputField label="Label" />
    </HandleValue>
  ))
  .add('with value', () => (
    <HandleValue initialValue="Some value">
      <InputField label="Label" />
    </HandleValue>
  ))
  .add('error', () => (
    <HandleValue initialValue="Some value">
      <InputField error label="Label" />
    </HandleValue>
  ))
  .add('disabled', () => (
    <HandleValue initialValue="Some value">
      <InputField label="Label" disabled />
    </HandleValue>
  ))
