import React from 'react'
import {storiesOf} from '@storybook/react'

import CountrySelectField from '.'

import HandleValue from '../../../../stories/util/handle-value'

storiesOf('CountrySelectField', module).add('default', () => (
  <HandleValue initialValue="DE">
    <CountrySelectField
      placeholder="Placeholder"
      changeLabel="Changing the country will reset all your material selections"
      changedLabel="If you select this country your material selection will be reset"
      changeButtonLabel="edit & reset material"
    />
  </HandleValue>
))
