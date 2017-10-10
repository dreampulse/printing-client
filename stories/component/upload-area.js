import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import UploadArea from 'Component/upload-area'

storiesOf('Upload Area', module)
  .add('default', () => (
    <UploadArea
      label="Drag 3D files here or"
      linkLabel="select files"
      accept=".stl"
      onChange={action('change')}
    />
  ))
