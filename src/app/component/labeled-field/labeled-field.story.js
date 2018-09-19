import React from 'react'
import {storiesOf} from '@storybook/react'

import LabeledField from '.'
import NumberField from '../number-field'
import InputField from '../input-field'

import HandleValue from '../../../../stories/util/handle-value'

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
