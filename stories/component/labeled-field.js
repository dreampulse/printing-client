import React from 'react'
import {storiesOf} from '@kadira/storybook'

import LabeledField from '../../src/app/component/labeled-field'
import NumberField from '../../src/app/component/number-field'
import HandleValue from '../util/handle-value'

storiesOf('Labeled Field', module)
  .add('default', () => (
    <HandleValue initialValue={1}>
      <LabeledField label="Label:">
        <NumberField />
      </LabeledField>
    </HandleValue>
  ))
