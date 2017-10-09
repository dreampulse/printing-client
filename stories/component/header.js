import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Header from 'Component/header'
import ProcessStep from 'Component/process-step'
import ProcessStepBar from 'Component/process-step-bar'

storiesOf('Header', module)
  .add('default', () => (
    <Header onClickIdentity={action('click identity')}>
      <ProcessStepBar currentStep={1}>
        <ProcessStep label="Process Step 1" />
        <ProcessStep label="Process Step 2" />
        <ProcessStep label="Process Step 3" />
      </ProcessStepBar>
    </Header>
  ))
