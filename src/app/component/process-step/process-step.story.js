import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ProcessStep from '.'

import invert from '../../../../stories/decorator/invert'

storiesOf('Process Step', module)
  .addDecorator(invert)
  .add('default', () => <ProcessStep label="Process Step" onClick={action('click')} />)
  .add('inactive', () => <ProcessStep label="Inactive Process Step" modifiers={['inactive']} />)
  .add('first', () => (
    <ProcessStep label="First Process Step" modifiers={['first']} onClick={action('click')} />
  ))
  .add('last', () => (
    <ProcessStep label="Last Process Step" modifiers={['last']} onClick={action('click')} />
  ))
  .add('last-active', () => (
    <ProcessStep
      label="Last Active Process Step"
      modifiers={['last-active']}
      onClick={action('click')}
    />
  ))
