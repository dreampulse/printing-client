import React from 'react'
import {storiesOf} from '@storybook/react'
import range from 'lodash/range'

import CartFlyout from '.'
import CartModelItem from '../cart-model-item'

storiesOf('CartFlyout', module)
  .add('default', () => (
    <CartFlyout title="2 files in your cart">
      {range(4).map(index => (
        <CartModelItem
          id={`some-id-${index}`}
          key={index}
          s
          imageSource="http://placehold.it/180x180"
          title="model_item_title_can_be_long_and_gets_truncated.stl"
          info="42 x 42 x 42 mm"
        />
      ))}
    </CartFlyout>
  ))
  .add('notify', () => (
    <CartFlyout notify title="2 files added to your cart">
      {range(2).map(index => (
        <CartModelItem
          selected
          id={`some-id-${index}`}
          key={index}
          s
          imageSource="http://placehold.it/180x180"
          title="model_item_title_can_be_long_and_gets_truncated.stl"
          info="42 x 42 x 42 mm"
        />
      ))}
      {range(2).map(index => (
        <CartModelItem
          id={`some-id-${index}`}
          key={index}
          s
          imageSource="http://placehold.it/180x180"
          title="model_item_title_can_be_long_and_gets_truncated.stl"
          info="42 x 42 x 42 mm"
        />
      ))}
    </CartFlyout>
  ))
  .add('with overflow', () => (
    <CartFlyout title="2 files in your cart">
      {range(6).map(index => (
        <CartModelItem
          id={`some-id-${index}`}
          key={index}
          s
          imageSource="http://placehold.it/180x180"
          title="model_item_title_can_be_long_and_gets_truncated.stl"
          info="42 x 42 x 42 mm"
        />
      ))}
    </CartFlyout>
  ))
