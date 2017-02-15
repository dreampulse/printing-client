import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import LabledCheckbox from '../../src/app/component/labled-checkbox'
import HandleChecked from '../util/handle-checked'

storiesOf('Labled Checkbox', module)
  .add('default', () => (
    <HandleChecked>
      <LabledCheckbox label="Label" onChange={action('onChange')} />
    </HandleChecked>
  ))
  .add('checked', () => (
    <HandleChecked checked>
      <LabledCheckbox label="Label" />
    </HandleChecked>
  ))
  .add('error', () => (
    <HandleChecked checked>
      <LabledCheckbox modifiers={['error']} label="Label" />
    </HandleChecked>
  ))
