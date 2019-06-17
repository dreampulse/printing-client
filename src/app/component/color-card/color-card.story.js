import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ColorCard from '.'
import ColorTrait from '../color-trait'
import Price from '../price'

storiesOf('ColorCard', module)
  .add('default', () => (
    <ColorCard
      colorTrait={<ColorTrait color="#ff0000" />}
      title="Red"
      price={<Price value="$19.44" prefix="+" />}
      onSelectClick={action('onSelectClick')}
      onUnavailableClick={action('onUnavailableClick')}
    />
  ))
  .add('selected', () => (
    <ColorCard
      selected
      colorTrait={<ColorTrait color="#ff0000" />}
      title="Red"
      price={<Price value="$19.44" prefix="+" />}
      onSelectClick={action('onSelectClick')}
      onUnavailableClick={action('onUnavailableClick')}
    />
  ))
  .add('loading', () => (
    <ColorCard
      loading
      colorTrait={<ColorTrait color="#ff0000" />}
      title="Red"
      price={<Price value="$19.44" prefix="+" />}
      onSelectClick={action('onSelectClick')}
      onUnavailableClick={action('onUnavailableClick')}
    />
  ))
  .add('unavailable', () => (
    <ColorCard
      unavailable
      colorTrait={<ColorTrait color="#ff0000" />}
      title="Red"
      price={<Price value="$19.44" prefix="+" />}
      onSelectClick={action('onSelectClick')}
      onUnavailableClick={action('onUnavailableClick')}
    />
  ))
