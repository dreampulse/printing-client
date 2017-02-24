import React from 'react'
import {storiesOf} from '@kadira/storybook'

import ModelQuantityItem from '../../src/app/component/model-quantity-item'
import ModelQuantityItemList from '../../src/app/component/model-quantity-item-list'

storiesOf('Model Quantity Item List & Model Quantity Item', module)
  .add('default', () => (
    <ModelQuantityItemList>
      <ModelQuantityItem
        imageSource="http://placehold.it/500x500"
        quantity={1}
        title="model_item_title.stl"
      />
      <ModelQuantityItem
        imageSource="http://placehold.it/500x500"
        quantity={1}
        title="model_item_title.stl"
      />
      <ModelQuantityItem
        imageSource="http://placehold.it/500x500"
        quantity={1}
        title="model_item_title.stl"
      />
      <ModelQuantityItem
        imageSource="http://placehold.it/500x500"
        quantity={1}
        title="model_item_title.stl"
      />
    </ModelQuantityItemList>
  ))
