import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import SelectActionField from '../../app/component/select-action-field'

storiesOf('Select Action Field', module)
  .add('default', () => (
    <SelectActionField
      onChange={action('change')}
      label="My label"
      actionLabel="edit"
      onActionClick={action('action clicked')}
      value="baz"
    >
      <option value="foo">foo</option>
      <option value="bar">bar</option>
      <option value="baz">baz baz baz</option>
    </SelectActionField>
  ))

