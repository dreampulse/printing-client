import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import range from 'lodash/range'
import {withState} from '@dump247/storybook-state'

import CartNavLink from '.'
import CartFlyout from '../cart-flyout'
import CartModelItem from '../cart-model-item'
import Button from '../button'

storiesOf('CartNavLink', module)
  .add('default', () => (
    <div style={{paddingLeft: '30%'}}>
      <CartNavLink
        onClick={action('onClick')}
        label="Your Cart"
        count={6}
        cartFlyout={
          <CartFlyout title="2 Files in yout cart">
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
        }
      />
    </div>
  ))
  .add(
    'increase count',
    withState({count: 1}, store => (
      <div style={{paddingLeft: '30%'}}>
        <CartNavLink
          onClick={action('onClick')}
          label="Your Cart"
          count={store.state.count}
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
        <Button label="+" onClick={() => store.set({count: store.state.count + 1})} />
        <Button label="-" onClick={() => store.set({count: store.state.count - 1})} />
      </div>
    ))
  )
  .add('count > 9', () => <CartNavLink onClick={action('onClick')} label="Your Cart" count={10} />)
  .add('zero', () => <CartNavLink onClick={action('onClick')} label="Your Cart" count={0} />)
