import React from 'react'
import {storiesOf} from '@storybook/react'

import StickyContainer from '.'

storiesOf('Sticky Container', module).add('default', () => (
  <div style={{height: '1000px'}}>
    This one is not.
    <StickyContainer>This text is sticky!</StickyContainer>
    This one is not.
  </div>
))