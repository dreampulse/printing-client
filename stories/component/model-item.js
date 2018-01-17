import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ModelItem from '../../src/app/component/model-item'

storiesOf('Model Item', module)
  .add('default', () => (
    <ModelItem
      imageSource="http://placehold.it/130x98"
      quantity={1}
      title="model_item_title.stl"
      subline="42 x 42 x 42 mm"
      onQuantityChange={action('quantity change')}
      onDelete={action('discard')}
    />
  ))
  .add('no subline', () => (
    <ModelItem
      imageSource="http://placehold.it/130x98"
      quantity={1}
      title="model_item_title.stl"
      onQuantityChange={action('quantity change')}
      onDelete={action('discard')}
    />
  ))
