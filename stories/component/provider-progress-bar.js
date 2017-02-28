import React from 'react'
import {storiesOf} from '@kadira/storybook'

import ProviderProgressBar from 'Component/provider-progress-bar'

storiesOf('Provider Progress Bar', module)
  .add('default', () => (
    <ProviderProgressBar currentStep={1} totalSteps={3} />
  ))
  .add('finished', () => (
    <ProviderProgressBar currentStep={3} totalSteps={3} />
  ))
