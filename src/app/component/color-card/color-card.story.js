import React from 'react'
import {storiesOf} from '@storybook/react'

import ColorCard from '.'
import ColorTrait from '../color-trait'
import Price from '../price'
import Button from '../button'

storiesOf('ColorCard', module).add('default', () => (
  <ColorCard
    colorTrait={<ColorTrait color="#ff0000" />}
    title="Red"
    price={<Price value="$19.44" prefix="+" />}
    button={<Button label="Select" minor tiny />}
  />
))
