import React from 'react'
import {storiesOf} from '@storybook/react'

import ProcessStep from '../../src/app/component/process-step'
import ProcessStepBar from '../../src/app/component/process-step-bar'
import invert from '../decorator/invert'

storiesOf('Process Step Bar', module)
  .addDecorator(invert)
  .add('default', () => (
    <ProcessStepBar currentStep={1}>
      <ProcessStep label="Process Step 1" />
      <ProcessStep label="Process Step 2" />
      <ProcessStep label="Process Step 3" />
    </ProcessStepBar>
  ))
