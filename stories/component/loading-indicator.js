import React from 'react'
import {storiesOf} from '@kadira/storybook'

import LoadingIndicator from '../../src/app/component/loading-indicator'

storiesOf('LoadingIndicator', module)
  .add('default', () => (
    <LoadingIndicator />
  ))
