import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import UploadModelItemError from '../../src/app/component/upload-model-item-error'

storiesOf('Upload Model Item Error', module).add('default', () => (
  <UploadModelItemError title="Upload failed" subline="This is why" onDelete={action('discard')} />
))
