import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import ModelItemLoad from '../../src/app/component/model-item-load'

storiesOf('Model Item Load', module)
  .add('default', () => (
    <ModelItemLoad
      status={0.7}
      title="Uploading"
      subline="model_item_title.stl"
      onStatusChange={action('Status change')}
      onDelete={action('delete')}
    />
  ))
