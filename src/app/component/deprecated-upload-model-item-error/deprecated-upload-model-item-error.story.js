import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import DeprecatedUploadModelItemError from '.'

storiesOf('Deprecated Upload Model Item Error', module).add('default', () => (
  <DeprecatedUploadModelItemError
    title="Upload failed"
    subline="This is why"
    onDelete={action('discard')}
  />
))
