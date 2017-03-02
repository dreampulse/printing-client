import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import ModelQuantityItem from 'Component/model-quantity-item'
import ModelQuantityItemList from 'Component/model-quantity-item-list'

storiesOf('Model Quantity Item List & Model Quantity Item', module)
  .add('default', () => (
    <ModelQuantityItemList>
      <ModelQuantityItem
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl with a very long text an is shitty fuck"
        onQuantityChange={action('quantity change')}
        onDelete={action('delete')}
      />
      <ModelQuantityItem
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl"
        onQuantityChange={action('quantity change')}
        onDelete={action('delete')}
      />
      <ModelQuantityItem
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl"
        onQuantityChange={action('quantity change')}
        onDelete={action('delete')}
      />
      <ModelQuantityItem
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl"
        onQuantityChange={action('quantity change')}
        onDelete={action('delete')}
      />
    </ModelQuantityItemList>
  ))
