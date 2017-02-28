import React from 'react'
import {storiesOf} from '@kadira/storybook'

import invert from '../decorator/invert'
import ProcessStep from 'Component/process-step'

storiesOf('Process Step', module)
  .addDecorator(invert)
  .add('default', () => (
    <ProcessStep label="Process Step" />
  ))
  .add('inactive', () => (
    <ProcessStep label="Inactive Process Step" modifiers={['inactive']} />
  ))
  .add('first', () => (
    <ProcessStep label="First Process Step" modifiers={['first']} />
  ))
  .add('last', () => (
    <ProcessStep label="Last Process Step" modifiers={['last']} />
  ))
  .add('last-active', () => (
    <ProcessStep label="Last Active Process Step" modifiers={['last-active']} />
  ))
