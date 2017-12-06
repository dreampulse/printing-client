import React from 'react'
import {storiesOf} from '@storybook/react'

import ConfigurationHeader from 'Component/configuration-header'
import LabeledField from 'Component/labeled-field'
import LocationField from 'Component/location-field'
import NumberField from 'Component/number-field'
import SelectField from 'Component/select-field'
import SelectMenu from 'Component/select-menu'

import HandleValue from '../util/handle-value'
import {googleMapsApiKey, currencies} from '../util/data'

storiesOf('Configuration Header', module).add('default', () => (
  <ConfigurationHeader>
    <LabeledField label="Shipping:" modifiers={['block']}>
      <HandleValue>
        <LocationField googleMapsApiKey={googleMapsApiKey} />
      </HandleValue>
    </LabeledField>
    <HandleValue initialValue={{value: 'USD', label: 'USD'}}>
      <SelectField menu={<SelectMenu values={currencies} />} modifiers={['currency']} />
    </HandleValue>
    <LabeledField label="Quantity:">
      <HandleValue initialValue={1}>
        <NumberField />
      </HandleValue>
    </LabeledField>
  </ConfigurationHeader>
))
