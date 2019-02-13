import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import UploadModelItemLoad from '.'

storiesOf('UploadModelItemLoad', module)
  .add('default', () => (
    <UploadModelItemLoad
      status={0.7}
      title="Uploading"
      subline="model_item_title.stl"
      onDelete={action('onDelete')}
    />
  ))
  .add('no status', () => (
    <UploadModelItemLoad
      title="Processing…"
      subline="model_item_title.stl"
      onDelete={action('onDelete')}
    />
  ))
