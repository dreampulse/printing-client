import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import SelectField from '../../src/app/component/select-field'

storiesOf('Select Field', module)
  .add('default', () => (
    <SelectField placeholder="Placeholder" value="" onChange={action('change')} />
  ))
  .add('selected', () => (
    <SelectField placeholder="Placeholder" value="Value" onChange={action('change')} />
  ))
