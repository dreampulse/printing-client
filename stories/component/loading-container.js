import React from 'react'
import {storiesOf} from '@storybook/react'

import LoadingContainer from 'Component/loading-container'

storiesOf('Loading Container', module)
  .add('default', () => (
    <LoadingContainer />
  ))
