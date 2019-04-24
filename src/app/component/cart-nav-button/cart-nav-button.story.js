import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import CartNavButton from '.'

storiesOf('CartNavButton', module)
  .add('default', () => (
    <CartNavButton
      onClick={action('onClick')}
      label="Your Cart"
      count={2}
      onHover={action('onHover')}
    />
  ))
  .add('with overflow', () => (
    <CartNavButton onClick={action('onClick')} label="Your Cart" count={10} />
  ))
  .add('disabled', () => (
    <CartNavButton disabled onClick={action('onClick')} label="Your Cart" count={2} />
  ))
