import React from 'react'
import {storiesOf} from '@storybook/react'

import LabeledField from '../../src/app/component/labeled-field'
import NumberField from '../../src/app/component/number-field'
import InputField from '../../src/app/component/input-field'
import HandleValue from '../util/handle-value'

storiesOf('Labeled Field', module)
  .add('default', () => (
    <LabeledField label="Label:">
      <HandleValue initialValue={1}>
        <NumberField />
      </HandleValue>
    </LabeledField>
  ))
  .add('block', () => (
    <LabeledField label="Label:" modifiers={['block']}>
      <HandleValue>
        <InputField label="Label" />
      </HandleValue>
    </LabeledField>
  ))
