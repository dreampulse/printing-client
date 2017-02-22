import React from 'react'
import {storiesOf} from '@kadira/storybook'

import ProviderImage from '../../src/app/component/provider-image'

storiesOf('Provider Image', module)
  .add('default', () => (
    <ProviderImage name="imaterialise" />
  ))
