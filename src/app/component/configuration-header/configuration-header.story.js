import React from 'react'
import {storiesOf} from '@storybook/react'

import ConfigurationHeader from '.'
import LocationField from '../location-field'
import SelectField from '../select-field'
import SelectMenu from '../select-menu'

import {googleMapsApiKey, currencies} from '../../../../stories/util/data'

storiesOf('ConfigurationHeader', module).add('default (no test)', () => (
  <ConfigurationHeader
    location={<LocationField googleMapsApiKey={googleMapsApiKey} />}
    currency={
      <SelectField value={{value: 'USD', label: 'USD'}} menu={<SelectMenu values={currencies} />} />
    }
    text="Some text"
  />
))
