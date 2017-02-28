import React from 'react'
import {storiesOf} from '@kadira/storybook'

import ProviderImage from 'Component/provider-image'

storiesOf('Provider Image', module)
  .add('default', () => (
    <ProviderImage name="imaterialise" />
  ))
