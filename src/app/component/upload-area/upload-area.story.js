import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import UploadArea from '.'

storiesOf('Upload Area', module)
  .add('default', () => (
    <UploadArea
      label="Drag any 3D files here or"
      linkLabel="select files"
      description="We support most file formats, but STL and OBJ files generally provide the best results and the lowest prices."
      accept="*"
      onChange={action('onChange')}
    />
  ))
  .add('l', () => (
    <UploadArea
      label="Drag any 3D files here or"
      linkLabel="select files"
      description="We support most file formats, but STL and OBJ files generally provide the best results and the lowest prices."
      accept="*"
      onChange={action('onChange')}
      l
    />
  ))
  .add('s', () => (
    <UploadArea
      label="Drag any 3D files here or"
      linkLabel="select files"
      description="We support most file formats, but STL and OBJ files generally provide the best results and the lowest prices."
      accept="*"
      onChange={action('onChange')}
      s
    />
  ))
