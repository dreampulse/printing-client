import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ModelQuantityItemList from '.'
import ModelQuantityItem from '../model-quantity-item'

storiesOf('Model Quantity Item List & Model Quantity Item', module)
  .add('default', () => (
    <ModelQuantityItemList>
      <ModelQuantityItem
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl with a very long text"
        onQuantityChange={action('quantity change')}
        onDelete={action('discard')}
      />
      <ModelQuantityItem
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl"
        onQuantityChange={action('quantity change')}
        onDelete={action('discard')}
      />
      <ModelQuantityItem
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl"
        onQuantityChange={action('quantity change')}
        onDelete={action('discard')}
      />
      <ModelQuantityItem
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl"
        onQuantityChange={action('quantity change')}
        onDelete={action('discard')}
      />
    </ModelQuantityItemList>
  ))
  .add('no handlers', () => (
    <ModelQuantityItemList>
      <ModelQuantityItem
        readOnly
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl with a very long text"
        subline="54 x 84 x 75 mm"
      />
      <ModelQuantityItem
        readOnly
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl with a very long text"
        subline="54 x 84 x 75 mm"
      />
      <ModelQuantityItem
        readOnly
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl with a very long text"
        subline="54 x 84 x 75 mm"
      />
      <ModelQuantityItem
        readOnly
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl with a very long text"
        subline="54 x 84 x 75 mm"
      />
    </ModelQuantityItemList>
  ))
