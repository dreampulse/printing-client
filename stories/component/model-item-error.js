import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ModelItemError from 'Component/model-item-error'

storiesOf('Model Item Error', module)
  .add('detault', () => (
    <ModelItemError
      title="Upload failed"
      subline="This is why"
      onDelete={action('delete')}
    />
  ))
