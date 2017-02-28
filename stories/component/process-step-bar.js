import React from 'react'
import {storiesOf} from '@kadira/storybook'

import invert from '../decorator/invert'
import ProcessStep from 'Component/process-step'
import ProcessStepBar from 'Component/process-step-bar'

storiesOf('Process Step Bar', module)
  .addDecorator(invert)
  .add('default', () => (
    <ProcessStepBar currentStep={1}>
      <ProcessStep label="Process Step 1" />
      <ProcessStep label="Process Step 2" />
      <ProcessStep label="Process Step 3" />
    </ProcessStepBar>
  ))
