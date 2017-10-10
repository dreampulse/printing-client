import React from 'react'
import {storiesOf} from '@storybook/react'

import ImageContainer from 'Component/image-container'

storiesOf('Image Container', module)
  .add('default', () => (
    <ImageContainer source="http://placehold.it/500x500" />
  ))
  .add('empty', () => (
    <ImageContainer />
  ))
  .add('model', () => (
    <ImageContainer modifiers={['model']} source="http://placehold.it/500x500/000000/ffffff" />
  ))
