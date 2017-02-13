import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import ModelItem from '../../src/app/component/model-item'

storiesOf('Model Item', module)
  .add('default', () => (
    <ModelItem
      imageSource="http://placehold.it/500x500"
      quantity={1}
      title="model_item_title.stl"
      subline="42 x 42 x 42 mm"
      onQuantityChange={action('quantity change')}
      onDelete={action('delete')}
    />
  ))
