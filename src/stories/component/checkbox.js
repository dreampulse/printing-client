import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Checkbox from '../../app/component/checkbox';

storiesOf('Checkbox', module)
  .add('default', () => (
    <Checkbox onChange={action('change')} />
  ))
  .add('checked', () => (
    <Checkbox checked onChange={action('change')} />
  ))
;
