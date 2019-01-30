import React from 'react'
import {storiesOf} from '@storybook/react'

import NumberField from '.'

import HandleValue from '../../../../stories/util/handle-value'

storiesOf('Number Field', module)
  .add('default', () => (
    <HandleValue initialValue={42}>
      <NumberField />
    </HandleValue>
  ))
  .add('lower limit', () => (
    <HandleValue initialValue={10}>
      <NumberField lowerLimit={10} />
    </HandleValue>
  ))
  .add('upper limit', () => (
    <HandleValue initialValue={10}>
      <NumberField upperLimit={10} />
    </HandleValue>
  ))
