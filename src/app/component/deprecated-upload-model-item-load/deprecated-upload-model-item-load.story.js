import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import DeprecatedUploadModelItemLoad from '.'

storiesOf('Deprecated Upload Model Item Load', module)
  .add('default', () => (
    <DeprecatedUploadModelItemLoad
      status={0.7}
      title="Uploading"
      subline="model_item_title.stl"
      onDelete={action('discard')}
    />
  ))
  .add('no status', () => (
    <DeprecatedUploadModelItemLoad
      title="Processing"
      subline="model_item_title.stl"
      onDelete={action('discard')}
    />
  ))
