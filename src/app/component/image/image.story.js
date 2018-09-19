import React from 'react'
import {storiesOf} from '@storybook/react'

import Image from '.'

storiesOf('Image', module).add('default', () => (
  <Image src="http://placehold.it/200x200" alt="placeholder image" />
))
