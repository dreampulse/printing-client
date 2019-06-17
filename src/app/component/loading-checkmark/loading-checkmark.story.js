import React from 'react'
import {storiesOf} from '@storybook/react'

import LoadingCheckmark from '.'

storiesOf('LoadingCheckmark', module)
  .add('default', () => <LoadingCheckmark />)
  .add('done', () => <LoadingCheckmark done />)
  .add('hideAfterTimeout', () => <LoadingCheckmark hideAfterTimeout />)
