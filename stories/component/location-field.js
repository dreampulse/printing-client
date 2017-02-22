import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import LocationField from '../../src/app/component/location-field'
import HandleValue from '../util/handle-value'

storiesOf('Location Field', module)
  .add('default', () => (
    <HandleValue>
      <LocationField
        placeholder="Set your location"
        googleMapsApiKey="AIzaSyBhZh8C1bG-jR_x6izJexGqNCyHhaPGeyo"
        onChange={action('change')}
      />
    </HandleValue>
  ))
