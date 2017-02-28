import React from 'react'
import {storiesOf} from '@kadira/storybook'

import StickyContainer from 'Component/sticky-container'

storiesOf('Sticky Container', module)
  .add('default', () => (
    <div style={{height: '1000px'}}>
      This one is not.
      <StickyContainer>
        This text is sticky!
      </StickyContainer>
      This one is not.
    </div>
  ))
