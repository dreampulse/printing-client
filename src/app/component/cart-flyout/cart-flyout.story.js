import React from 'react'
import {storiesOf} from '@storybook/react'
import {withState} from '@dump247/storybook-state'

import CartFlyout from '.'
import CartModelItem from '../cart-model-item'
import PositioningPortal from '../positioning-portal'
import CartNavButton from '../cart-nav-button'

storiesOf('CartFlyout', module)
  .add('default', () => (
    <CartFlyout title="2 Files in yout cart">
      <CartModelItem
        s
        imageSource="http://placehold.it/180x180"
        title="model_item_title_can_be_long_and_gets_truncated.stl"
        info="42 x 42 x 42 mm"
      />
      <CartModelItem
        s
        imageSource="http://placehold.it/180x180"
        title="model_item_title_can_be_long_and_gets_truncated.stl"
        info="42 x 42 x 42 mm"
      />
      <CartModelItem
        s
        imageSource="http://placehold.it/180x180"
        title="model_item_title_can_be_long_and_gets_truncated.stl"
        info="42 x 42 x 42 mm"
      />
      <CartModelItem
        s
        imageSource="http://placehold.it/180x180"
        title="model_item_title_can_be_long_and_gets_truncated.stl"
        info="42 x 42 x 42 mm"
      />
    </CartFlyout>
  ))
  .add('with overflow', () => (
    <CartFlyout title="2 Files in yout cart">
      <CartModelItem
        s
        imageSource="http://placehold.it/180x180"
        title="model_item_title_can_be_long_and_gets_truncated.stl"
        info="42 x 42 x 42 mm"
      />
      <CartModelItem
        s
        imageSource="http://placehold.it/180x180"
        title="model_item_title_can_be_long_and_gets_truncated.stl"
        info="42 x 42 x 42 mm"
      />
      <CartModelItem
        s
        imageSource="http://placehold.it/180x180"
        title="model_item_title_can_be_long_and_gets_truncated.stl"
        info="42 x 42 x 42 mm"
      />
      <CartModelItem
        s
        imageSource="http://placehold.it/180x180"
        title="model_item_title_can_be_long_and_gets_truncated.stl"
        info="42 x 42 x 42 mm"
      />
      <CartModelItem
        s
        imageSource="http://placehold.it/180x180"
        title="model_item_title_can_be_long_and_gets_truncated.stl"
        info="42 x 42 x 42 mm"
      />
      <CartModelItem
        s
        imageSource="http://placehold.it/180x180"
        title="model_item_title_can_be_long_and_gets_truncated.stl"
        info="42 x 42 x 42 mm"
      />
    </CartFlyout>
  ))
  .add(
    'with PositioningPortal',
    withState({isOpen: false}, store => (
      <PositioningPortal
        behindOverlay
        isOpen={store.state.isOpen}
        onShouldClose={() => store.set({isOpen: false})}
        portalContent={
          <CartFlyout title="2 Files in yout cart">
            <CartModelItem
              s
              imageSource="http://placehold.it/180x180"
              title="model_item_title_can_be_long_and_gets_truncated.stl"
              info="42 x 42 x 42 mm"
            />
            <CartModelItem
              s
              imageSource="http://placehold.it/180x180"
              title="model_item_title_can_be_long_and_gets_truncated.stl"
              info="42 x 42 x 42 mm"
            />
            <CartModelItem
              s
              imageSource="http://placehold.it/180x180"
              title="model_item_title_can_be_long_and_gets_truncated.stl"
              info="42 x 42 x 42 mm"
            />
            <CartModelItem
              s
              imageSource="http://placehold.it/180x180"
              title="model_item_title_can_be_long_and_gets_truncated.stl"
              info="42 x 42 x 42 mm"
            />
            <CartModelItem
              s
              imageSource="http://placehold.it/180x180"
              title="model_item_title_can_be_long_and_gets_truncated.stl"
              info="42 x 42 x 42 mm"
            />
          </CartFlyout>
        }
      >
        <CartNavButton label="Your Cart" count={10} onHover={() => store.set({isOpen: true})} />
      </PositioningPortal>
    ))
  )
