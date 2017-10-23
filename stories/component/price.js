import React from 'react'
import {storiesOf} from '@storybook/react'

import Price from 'Component/price'

storiesOf('Price', module)
  .add('default', () => <Price value="$19.44" meta="incl. tax & shipping" />)
  .add('loading', () => <Price value="$19.44" meta="incl. tax & shipping" loading />)
