import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import UploadModelItemError from '.'

storiesOf('UploadModelItemError', module).add('default', () => (
  <UploadModelItemError title="Upload failed" subline="This is why" onDelete={action('onDelete')} />
))
