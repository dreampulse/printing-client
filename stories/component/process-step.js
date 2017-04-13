import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import ProcessStep from 'Component/process-step'
import invert from '../decorator/invert'

storiesOf('Process Step', module)
  .addDecorator(invert)
  .add('default', () => (
    <ProcessStep label="Process Step" onClick={action('click')} />
  ))
  .add('inactive', () => (
    <ProcessStep label="Inactive Process Step" modifiers={['inactive']} />
  ))
  .add('first', () => (
    <ProcessStep label="First Process Step" modifiers={['first']} onClick={action('click')} />
  ))
  .add('last', () => (
    <ProcessStep label="Last Process Step" modifiers={['last']} onClick={action('click')} />
  ))
  .add('last-active', () => (
    <ProcessStep label="Last Active Process Step" modifiers={['last-active']} onClick={action('click')} />
  ))
