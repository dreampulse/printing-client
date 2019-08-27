import React from 'react'
import {storiesOf} from '@storybook/react'

import ModelViewer from '.'

storiesOf('ModelViewer', module)
  .add('default', () => <ModelViewer sceneId="1d4d7790-c1b5-42eb-8815-ba49349f45df" />)
  .add('without scene id', () => <ModelViewer />)
