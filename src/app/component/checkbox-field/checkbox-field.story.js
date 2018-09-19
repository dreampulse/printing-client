import React from 'react'
import {storiesOf} from '@storybook/react'

import CheckboxField from '.'
import HandleValue from '../../../../stories/util/handle-value'

storiesOf('Checkbox Field', module)
  .add('default', () => (
    <HandleValue valueName="checked">
      <CheckboxField />
    </HandleValue>
  ))
  .add('checked', () => (
    <HandleValue initialValue valueName="checked">
      <CheckboxField />
    </HandleValue>
  ))
  .add('error', () => (
    <HandleValue valueName="checked">
      <CheckboxField modifiers={['error']} />
    </HandleValue>
  ))
