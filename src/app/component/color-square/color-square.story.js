import React from 'react'
import {storiesOf} from '@storybook/react'

import ColorSquare from '.'

storiesOf('Color Square', module)
  .add('default', () => <ColorSquare color="#ff0000" />)
  .add('image', () => <ColorSquare image="http://placehold.it/40x40" />)
