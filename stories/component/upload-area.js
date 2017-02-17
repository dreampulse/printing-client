import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import UploadArea from '../../src/app/component/upload-area'

storiesOf('Upload Area', module)
  .add('default', () => (
    <UploadArea
      label="Drag 3D files here or"
      linkLabel="select files"
      accept=".stl"
      onChange={action('change')}
    />
  ))
