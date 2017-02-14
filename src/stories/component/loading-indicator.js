import React from 'react'
import {storiesOf} from '@kadira/storybook'

import InvertDecorator from '../decorator/invert'
import LoadingIndicator from '../../app/component-legacy/loading-indicator'

storiesOf('Loading Indicator', module)
  .add('default', () => (
    <LoadingIndicator />
  ))
  .add('large', () => (
    <LoadingIndicator modifiers={['l']} />
  ))
  .add('invert', () => InvertDecorator(() => (
    <LoadingIndicator modifiers={['invert']} />
  )))
