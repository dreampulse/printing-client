import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import LabeledCheckbox from 'Component/labeled-checkbox'
import HandleChecked from '../util/handle-checked'

storiesOf('Labeled Checkbox', module)
  .add('default', () => (
    <HandleChecked>
      <LabeledCheckbox label="Label" onChange={action('onChange')} />
    </HandleChecked>
  ))
  .add('checked', () => (
    <HandleChecked checked>
      <LabeledCheckbox label="Label" />
    </HandleChecked>
  ))
  .add('error', () => (
    <HandleChecked checked>
      <LabeledCheckbox modifiers={['error']} label="Label" />
    </HandleChecked>
  ))
