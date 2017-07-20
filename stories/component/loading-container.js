import React from 'react'
import {storiesOf} from '@kadira/storybook'

import LoadingContainer from 'Component/loading-container'

storiesOf('Loading Container', module)
  .add('default', () => (
    <LoadingContainer />
  ))
