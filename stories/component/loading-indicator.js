import React from 'react'
import {storiesOf} from '@kadira/storybook'

import LoadingIndicator from '../../src/app/component/loading-indicator'

storiesOf('Loading Indicator', module)
  .add('default', () => (
    <LoadingIndicator />
  ))
