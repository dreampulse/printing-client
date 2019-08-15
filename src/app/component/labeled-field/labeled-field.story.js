import React from 'react'
import {storiesOf} from '@storybook/react'

import LabeledField from '.'
import NumberField from '../number-field'

import HandleValue from '../../../../stories/util/handle-value'

storiesOf('LabeledField', module).add('default', () => (
  <LabeledField label="Label:">
    <HandleValue initialValue={1}>
      <NumberField />
    </HandleValue>
  </LabeledField>
))
