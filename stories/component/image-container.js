import React from 'react'
import {storiesOf} from '@kadira/storybook'

import ImageContainer from 'Component/image-container'

storiesOf('Image Container', module)
  .add('default', () => (
    <ImageContainer source="http://placehold.it/500x500" />
  ))
  .add('empty', () => (
    <ImageContainer />
  ))
