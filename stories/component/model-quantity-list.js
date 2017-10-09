import React from 'react'
import {storiesOf, action} from '@storybook/react'

import ModelQuantityItem from 'Component/model-quantity-item'
import ModelQuantityItemList from 'Component/model-quantity-item-list'

storiesOf('Model Quantity Item List & Model Quantity Item', module)
  .add('default', () => (
    <ModelQuantityItemList>
      <ModelQuantityItem
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl with a very long text"
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
