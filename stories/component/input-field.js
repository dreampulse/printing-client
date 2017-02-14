import React from 'react'
import {storiesOf} from '@kadira/storybook'

import InputField from '../../src/app/component/input-field'

storiesOf('Input Field', module)
  .add('default', () => (
    <InputField label="Label" />
  ))
  .add('with value', () => (
    <InputField label="Label" value="Some Value" />
  ))
  .add('error', () => (
    <InputField modifiers={['error']} label="Label" value="Some Value" />
  ))
