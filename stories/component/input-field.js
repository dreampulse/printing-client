import React from 'react'
import {storiesOf} from '@kadira/storybook'

import InputField from '../../src/app/component/input-field'
import HandleValue from '../util/handle-value'

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
      <InputField modifiers={['error']} label="Label" />
    </HandleValue>
  ))
