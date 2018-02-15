import React from 'react'
import {storiesOf} from '@storybook/react'

import Progress from '../../src/app/component/progress'

const Container = ({children}) => <div style={{height: '100px'}}>{children}</div>

storiesOf('Progress', module)
  .add('without value', () => (
    <Container>
      <Progress />
    </Container>
  ))
  .add('20%', () => (
    <Container>
      <Progress value={20} />
    </Container>
  ))
  .add('100%', () => (
    <Container>
      <Progress value={100} />
    </Container>
  ))
