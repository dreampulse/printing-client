import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import SelectField from '../../app/component/select-field';

storiesOf('Select Field', module)
  .add('default', () => (
    <SelectField onChange={action('change')} label="My label" value="baz">
      <option value="foo">foo</option>
      <option value="bar">bar</option>
      <option value="baz">baz baz baz</option>
    </SelectField>
  ))
  .add('empty', () => (
    <SelectField onChange={action('change')} label="My label">
      <option disabled value="" />
      <option value="bar">bar</option>
      <option value="baz">baz baz baz</option>
    </SelectField>
  ))
  .add('error', () => (
    <SelectField modifiers={['error']} onChange={action('change')} label="My label" value="baz">
      <option value="foo">foo</option>
      <option value="bar">bar</option>
      <option value="baz">baz baz baz</option>
    </SelectField>
  ));
