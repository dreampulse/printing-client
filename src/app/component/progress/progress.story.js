import React from 'react'
import {storiesOf} from '@storybook/react'

import Progress from '.'

storiesOf('Progress', module)
  .addDecorator(story => <div style={{height: '100px'}}>{story()}</div>)
  .add('default', () => <Progress value={100} />)
  .add('20%', () => <Progress value={20} />)
