import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import range from 'lodash/range'

import CartNavLink from '.'
import CartFlyout from '../cart-flyout'
import CartModelItem from '../cart-model-item'

storiesOf('CartNavLink', module)
  .add('default', () => (
    <div style={{paddingLeft: '30%'}}>
      <CartNavLink
        onClick={action('onClick')}
        label="Your Cart"
        count={2}
        cartFlyout={
          <CartFlyout title="2 Files in yout cart">
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
        }
      />
    </div>
  ))
  .add('count > 9', () => <CartNavLink onClick={action('onClick')} label="Your Cart" count={10} />)
  .add('zero', () => <CartNavLink onClick={action('onClick')} label="Your Cart" count={0} />)
