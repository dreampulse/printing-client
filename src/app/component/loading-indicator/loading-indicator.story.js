import React from 'react'
import {storiesOf} from '@storybook/react'

import invert from '../../../../stories/decorator/invert'
import LoadingIndicator from '.'

storiesOf('LoadingIndicator', module)
  .add('default', () => <LoadingIndicator />)
  .add('invert', () => <LoadingIndicator invert />, {decorators: [invert]})
