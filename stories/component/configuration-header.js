import React from 'react'
import {storiesOf} from '@storybook/react'

import ConfigurationHeader from '../../src/app/component/configuration-header'
import LabeledField from '../../src/app/component/labeled-field'
import LocationField from '../../src/app/component/location-field'
import NumberField from '../../src/app/component/number-field'
import SelectField from '../../src/app/component/select-field'
import SelectMenu from '../../src/app/component/select-menu'

import {getCurrencies} from '../../src/app/lib/currency'

import HandleValue from '../util/handle-value'
import {googleMapsApiKey} from '../util/data'

const currencies = getCurrencies()

storiesOf('Configuration Header', module).add('default', () => (
  <ConfigurationHeader>
    <LabeledField label="Shipping:" modifiers={['block']}>
      <HandleValue>
        <LocationField googleMapsApiKey={googleMapsApiKey} />
      </HandleValue>
    </LabeledField>
    <HandleValue initialValue={{value: 'USD', label: 'USD'}}>
      <SelectField menu={<SelectMenu values={currencies} />} />
    </HandleValue>
    <LabeledField label="Quantity:">
      <HandleValue initialValue={1}>
        <NumberField />
      </HandleValue>
    </LabeledField>
  </ConfigurationHeader>
))
