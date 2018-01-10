import React from 'react'
import {storiesOf} from '@storybook/react'

import Baloon from '../../src/app/component/baloon'

storiesOf('Baloon', module)
  .add('default', () => (
    <Baloon>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </Baloon>
  ))
  .add('right', () => (
    <Baloon modifiers={['right']}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </Baloon>
  ))
