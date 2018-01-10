import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ModelItem from '../../src/app/component/model-item'
import ModelItemError from '../../src/app/component/model-item-error'
import ModelItemLoad from '../../src/app/component/model-item-load'

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
  .add('error', () => (
    <ModelItemError
      imageSource="http://placehold.it/130x98"
      modifiers={['error']}
      title="Upload failed"
      subline="This is why"
      onDelete={action('discard')}
    />
  ))
  .add('load', () => (
    <ModelItemLoad
      modifiers={['load']}
      status={0.7}
      title="Uploading"
      subline="model_item_title.stl"
      onStatusChange={action('Status change')}
      onDelete={action('discard')}
    />
  ))
