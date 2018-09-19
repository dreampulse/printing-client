import React from 'react'
import {storiesOf} from '@storybook/react'

import Progress from '.'

const Container = ({children}) => <div style={{height: '100px'}}>{children}</div>

storiesOf('Progress', module)
  .add('default', () => (
    <Container>
      <Progress value={100} />
    </Container>
  ))
  .add('20%', () => (
    <Container>
      <Progress value={20} />
    </Container>
  ))
