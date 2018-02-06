import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import UploadModelItemLoad from '../../src/app/component/upload-model-item-load'

storiesOf('Upload Model Item Load', module)
  .add('default', () => (
    <UploadModelItemLoad
      status={0.7}
      title="Uploading"
      subline="model_item_title.stl"
      onDelete={action('discard')}
    />
  ))
  .add('no status', () => (
    <UploadModelItemLoad
      title="Processing"
      subline="model_item_title.stl"
      onDelete={action('discard')}
    />
  ))
