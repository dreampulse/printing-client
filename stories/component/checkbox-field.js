import React from 'react'
import {storiesOf} from '@storybook/react'

import CheckboxField from '../../src/app/component/checkbox-field'
import HandleChecked from '../util/handle-checked'

storiesOf('Checkbox Field', module)
  .add('default', () => (
    <HandleChecked checked>
      <CheckboxField />
    </HandleChecked>
  ))
  .add('checked', () => (
    <HandleChecked checked>
      <CheckboxField />
    </HandleChecked>
  ))
  .add('error', () => (
    <HandleChecked checked>
      <CheckboxField modifiers={['error']} />
    </HandleChecked>
  ))
