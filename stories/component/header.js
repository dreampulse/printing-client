import React from 'react'
import {storiesOf} from '@kadira/storybook'

import Header from '../../src/app/component/header'
import ProcessStep from '../../src/app/component/process-step'
import ProcessStepBar from '../../src/app/component/process-step-bar'

storiesOf('Header', module)
  .add('default', () => (
    <Header>
      <ProcessStepBar currentStep={1}>
        <ProcessStep label="Process Step 1" />
        <ProcessStep label="Process Step 2" />
        <ProcessStep label="Process Step 3" />
      </ProcessStepBar>
    </Header>
  ))
