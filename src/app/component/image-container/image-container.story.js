import React from 'react'
import {storiesOf} from '@storybook/react'

import ImageContainer from '.'

storiesOf('Image Container', module)
  .add('default', () => <ImageContainer source="http://placehold.it/400x300" alt="Default" />)
  .add('ratio 1:1', () => (
    <ImageContainer source="http://placehold.it/500x500" modifiers={['ratio-1-1']} alt="Default" />
  ))
  .add('broken', () => <ImageContainer source="http://example.com/does-not-exist" alt="Broken" />)
  .add('without source', () => <ImageContainer alt="Without src" />)
  .add('with fallbackSource', () => (
    <ImageContainer
      source="http://placehold.it/4000x3000"
      fallbackSource="http://placehold.it/400x300"
      alt="Fallback Source"
    />
  ))
