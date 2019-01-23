import React from 'react'
import {storiesOf} from '@storybook/react'

import App from '.'

storiesOf('App', module).add('default', () => (
  <App header="Some Header" footer="Some Footer">
    Some main content
  </App>
))
