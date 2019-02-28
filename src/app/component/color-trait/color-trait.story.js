import React from 'react'
import {storiesOf} from '@storybook/react'

import ColorTrait from '.'

storiesOf('ColorTrait', module)
  .add('default', () => <ColorTrait color="#ff0000" />)
  .add('white', () => <ColorTrait color="#ffffff" />)
  .add('image', () => <ColorTrait image="http://placehold.it/40x40" />)
