import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import ModelItemError from 'Component/model-item-error'

storiesOf('Model Item Error', module)
  .add('detault', () => (
    <ModelItemError
      title="Upload failed"
      subline="This is why"
      onDelete={action('delete')}
    />
  ))