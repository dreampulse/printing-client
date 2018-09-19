import React from 'react'
import {storiesOf} from '@storybook/react'

import ProcessStepBar from '.'
import ProcessStep from '../process-step'

import invert from '../../../../stories/decorator/invert'

storiesOf('Process Step Bar', module)
  .addDecorator(invert)
  .add('default', () => (
    <ProcessStepBar currentStep={1}>
      <ProcessStep label="Process Step 1" />
      <ProcessStep label="Process Step 2" />
      <ProcessStep label="Process Step 3" />
    </ProcessStepBar>
  ))
