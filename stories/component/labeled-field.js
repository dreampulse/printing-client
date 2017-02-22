import React from 'react'
import {storiesOf} from '@kadira/storybook'

import LabeledField from '../../src/app/component/labeled-field'
import NumberField from '../../src/app/component/number-field'
import HandleValue from '../util/handle-value'

storiesOf('Labeled Field', module)
  .add('default', () => (
    <LabeledField label="Label:">
      <HandleValue initialValue={1}>
        <NumberField />
      </HandleValue>
    </LabeledField>
  ))
