import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import LabeledCheckbox from '.'

import HandleValue from '../../../../stories/util/handle-value'

storiesOf('Labeled Checkbox', module)
  .add('default', () => (
    <HandleValue>
      <LabeledCheckbox label="Label" onChange={action('onChange')} />
    </HandleValue>
  ))
  .add('checked', () => (
    <HandleValue initialValue valueName="checked">
      <LabeledCheckbox label="Label" />
    </HandleValue>
  ))
  .add('error', () => (
    <HandleValue valueName="checked">
      <LabeledCheckbox modifiers={['error']} label="Label" />
    </HandleValue>
  ))