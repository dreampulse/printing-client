import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import TextAreaField from '../../app/component/text-area-field'

storiesOf('Text Area Field', module)
  .add('default', () => (
    <TextAreaField label='Some label' value='' onChange={action('change')} />
  ))
  .add('with value', () => (
    <TextAreaField label='Some label' value='Some text' onChange={action('change')} />
  ))
  .add('error', () => (
    <TextAreaField modifiers={['error']} label='Some label' value='Some text' onChange={action('change')} />
  ))
