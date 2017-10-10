import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ModelItemLoad from 'Component/model-item-load'

storiesOf('Model Item Load', module)
  .add('default', () => (
    <ModelItemLoad
      status={0.7}
      title="Uploading"
      subline="model_item_title.stl"
      onDelete={action('delete')}
    />
  ))
  .add('no status', () => (
    <ModelItemLoad
      modifiers={['processing']}
      title="Processing"
      subline="model_item_title.stl"
      onDelete={action('delete')}
    />
  ))
