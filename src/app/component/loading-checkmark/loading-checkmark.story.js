import React from 'react'
import {storiesOf} from '@storybook/react'

import LoadingCheckmark from '.'

storiesOf('Loading Checkmark', module)
  .add('default', () => <LoadingCheckmark />)
  .add('done', () => <LoadingCheckmark modifiers={['done']} />)
  .add('hideWithDelay', () => <LoadingCheckmark modifiers={['hideWithDelay']} />)
