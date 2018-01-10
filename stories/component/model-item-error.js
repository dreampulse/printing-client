import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ModelItemError from '../../src/app/component/model-item-error'

storiesOf('Model Item Error', module).add('default', () => (
  <ModelItemError title="Upload failed" subline="This is why" onDelete={action('discard')} />
))
