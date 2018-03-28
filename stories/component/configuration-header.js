import React from 'react'
import {storiesOf} from '@storybook/react'

import ConfigurationHeader from '../../src/app/component/configuration-header'
import LabeledField from '../../src/app/component/labeled-field'
import LocationField from '../../src/app/component/location-field'
import SelectField from '../../src/app/component/select-field'
import SelectMenu from '../../src/app/component/select-menu'

import HandleValue from '../util/handle-value'
import {googleMapsApiKey, currencies} from '../util/data'

storiesOf('Configuration Header', module).add('default', () => (
  <ConfigurationHeader
    location={
      <LabeledField label="Shipping:" modifiers={['block']}>
        <HandleValue>
          <LocationField googleMapsApiKey={googleMapsApiKey} />
        </HandleValue>
      </LabeledField>
    }
    currency={
      <HandleValue initialValue={{value: 'USD', label: 'USD'}}>
        <SelectField menu={<SelectMenu values={currencies} />} />
      </HandleValue>
    }
    text="Some text"
  />
))
