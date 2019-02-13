import React from 'react'
import {storiesOf} from '@storybook/react'

import Price from '.'
import LoadingCheckmark from '../loading-checkmark'

// TODO: support price difference

storiesOf('Price', module)
  .add('default', () => <Price value="$19.44" meta="incl. tax & shipping" />)
  .add('with prefix', () => <Price value="$19.44" prefix="From" />)
  .add('loading', () => <Price value="$19.44" meta="incl. tax & shipping" loading />)
  .add('global loading', () => (
    <Price value="$19.44" loadingCheckmark={<LoadingCheckmark modifiers={['done']} />} />
  ))
