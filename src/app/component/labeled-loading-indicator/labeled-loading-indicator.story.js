import React from 'react'
import {storiesOf} from '@storybook/react'

import LabeledLoadingIndicator from '.'

storiesOf('Labeled Loading Indicator', module).add('default', () => (
  <LabeledLoadingIndicator>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </LabeledLoadingIndicator>
))
