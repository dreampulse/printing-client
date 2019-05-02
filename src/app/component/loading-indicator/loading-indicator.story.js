import React from 'react'
import {storiesOf} from '@storybook/react'

import invert from '../../../../stories/decorator/invert'
import LoadingIndicator from '.'

storiesOf('Loading Indicator', module)
  .add('default', () => <LoadingIndicator />)
  .addDecorator(invert)
  .add('invert', () => <LoadingIndicator invert />)
