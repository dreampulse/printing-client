import React from 'react'
import {storiesOf} from '@storybook/react'

import Price from '.'
import LoadingCheckmark from '../loading-checkmark'

storiesOf('Price', module)
  .add('default', () => <Price value="$19.44" />)
  .add('prefix', () => <Price value="$19.44" prefix="+" />)
  .add('loading', () => <Price value="$19.44" loading />)
  .add('loadingCheckmark', () => (
    <Price value="$19.44" loadingCheckmark={<LoadingCheckmark modifiers={['done']} />} />
  ))
