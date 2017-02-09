import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import InputField from '../../app/component-legacy/input-field'

import icon from '../../asset/icon/placeholder.svg'

storiesOf('Input field', module)
  .add('default', () => (
    <InputField label="Some label" value="" onChange={action('change')} />
  ))
  .add('with value', () => (
    <InputField label="Some label" value="Some value" onChange={action('change')} />
  ))
  .add('with icon', () => (
    <InputField icon={icon} label="Some label" value="Some value" onChange={action('change')} />
  ))
  .add('error', () => (
    <InputField modifiers={['error']} label="Some label" value="Some value" onChange={action('change')} />
  ))
  .add('type date', () => (
    <InputField type="date" label="Date Field" onChange={action('change')} />
  ))
  .add('type time', () => (
    <InputField type="time" label="Time Field" onChange={action('change')} />
  ))
