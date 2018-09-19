import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import StaticField from '.'

storiesOf('Static Field', module).add('default', () => (
  <StaticField
    value="Some Value"
    changeLinkLabel="Change label"
    onChangeLinkClick={action('onChangeLinkClick')}
  />
))
