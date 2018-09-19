import React from 'react'
import {storiesOf} from '@storybook/react'

import ConfigurationHeader from '.'
import LocationField from '../location-field'
import SelectField from '../select-field'
import SelectMenu from '../select-menu'

import HandleValue from '../../../../stories/util/handle-value'
import {googleMapsApiKey, currencies} from '../../../../stories/util/data'

storiesOf('Configuration Header', module).add('default', () => (
  <ConfigurationHeader
    location={
      <HandleValue>
        <LocationField googleMapsApiKey={googleMapsApiKey} />
      </HandleValue>
    }
    currency={
      <HandleValue initialValue={{value: 'USD', label: 'USD'}}>
        <SelectField menu={<SelectMenu values={currencies} />} />
      </HandleValue>
    }
    text="Some text"
  />
))
