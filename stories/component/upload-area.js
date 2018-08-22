import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import UploadArea from '../../src/app/component/upload-area'

storiesOf('Upload Area', module)
  .add('default', () => (
    <UploadArea
      label="Drag any 3D files here or"
      linkLabel="select files"
      description="Supported file formats: STL, OBJ, WRL, SKP, DAE, 3DS, IGS, FBX, PLY, X3D, STP, PRT, …"
      accept="*"
      onChange={action('change')}
    />
  ))
  .add('l', () => (
    <UploadArea
      label="Drag any 3D files here or"
      linkLabel="select files"
      description="Supported file formats: STL, OBJ, WRL, SKP, DAE, 3DS, IGS, FBX, PLY, X3D, STP, PRT, …"
      accept="*"
      onChange={action('change')}
      modifiers={['l']}
    />
  ))
