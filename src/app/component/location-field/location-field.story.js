import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import LocationField from '.'

import HandleValue from '../../../../stories/util/handle-value'
import {googleMapsApiKey} from '../../../../stories/util/data'

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
