import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import LocationField from '../../src/app/component/location-field'
import HandleValue from '../util/handle-value'
import {googleMapsApiKey} from '../util/data'

storiesOf('Location Field', module)
  .add('default', () => (
    <HandleValue>
      <LocationField
        placeholder="Set your location"
        googleMapsApiKey={googleMapsApiKey}
        onChange={action('change')}
      />
    </HandleValue>
  ))
  .add('initial value', () => (
    <HandleValue initialValue="München, Deutschland">
      <LocationField
        placeholder="Set your location"
        googleMapsApiKey={googleMapsApiKey}
        onChange={action('change')}
      />
    </HandleValue>
  ))
  .add('error', () => (
    <HandleValue>
      <LocationField
        modifiers={['error']}
        placeholder="Set your location"
        googleMapsApiKey={googleMapsApiKey}
        onChange={action('change')}
      />
    </HandleValue>
  ))
