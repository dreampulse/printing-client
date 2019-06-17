import React from 'react'
import {storiesOf} from '@storybook/react'
import range from 'lodash/range'

import ColorCard from '../color-card'
import ColorCardList from '.'
import ColorTrait from '../color-trait'
import Price from '../price'
import Button from '../button'

storiesOf('ColorCardList', module).add('default', () => (
  <ColorCardList>
    {range(20).map(i => (
      <ColorCard
        key={i}
        colorTrait={<ColorTrait color="#ff0000" />}
        title={`Color ${i}`}
        price={<Price value="$19.44" prefix="+" />}
        button={<Button label="Select" minor tiny />}
      />
    ))}
  </ColorCardList>
))
