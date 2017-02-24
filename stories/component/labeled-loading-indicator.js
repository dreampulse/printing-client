import React from 'react'
import {storiesOf} from '@kadira/storybook'

import LabeledLoadingIndicator from '../../src/app/component/labeled-loading-indicator'

storiesOf('Labeled Loading Indicator', module)
  .add('default', () => (
    <LabeledLoadingIndicator>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </LabeledLoadingIndicator>
  ))
