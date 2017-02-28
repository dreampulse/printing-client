import React from 'react'
import {storiesOf} from '@kadira/storybook'

import Image from 'Component/image'

storiesOf('Image', module)
  .add('default', () => (
    <Image src="http://placehold.it/200x200" alt="placeholder image" />
  ))
