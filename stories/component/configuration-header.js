import React from 'react'
import {storiesOf} from '@kadira/storybook'

import ConfigurationHeader from '../../src/app/component/configuration-header'
import LabeledField from '../../src/app/component/labeled-field'
import LocationField from '../../src/app/component/location-field'
import NumberField from '../../src/app/component/number-field'

import HandleValue from '../util/handle-value'
import {googleMapsApiKey} from '../util/data'

storiesOf('Configuration Header', module)
  .add('default', () => (
    <ConfigurationHeader>
      <LabeledField label="Shipping:" modifiers={['block']}>
        <HandleValue>
          <LocationField googleMapsApiKey={googleMapsApiKey} />
        </HandleValue>
      </LabeledField>
      <LabeledField label="Quantity:">
        <HandleValue initialValue={1}>
          <NumberField />
        </HandleValue>
      </LabeledField>
    </ConfigurationHeader>
  ))
