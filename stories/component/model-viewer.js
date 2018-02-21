import React from 'react'
import {storiesOf} from '@storybook/react'

import ModelViewer from '../../src/app/component/model-viewer'

const Container = ({children}) => <div style={{height: '500px'}}>{children}</div>

storiesOf('Model Viewer', module)
  .add('default', () => (
    <Container>
      <ModelViewer sceneId="1d4d7790-c1b5-42eb-8815-ba49349f45df" />
    </Container>
  ))
  .add('without scene id', () => (
    <Container>
      <ModelViewer />
    </Container>
  ))
