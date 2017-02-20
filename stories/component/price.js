import React from 'react'
import {storiesOf} from '@kadira/storybook'

import Price from '../../src/app/component/price'

storiesOf('Price', module)
  .add('default', () => (
    <Price value="$19.44" meta="incl. tax & shipping" />
  ))
  .add('loading', () => (
    <Price value="$19.44" meta="incl. tax & shipping" loading />
  ))
