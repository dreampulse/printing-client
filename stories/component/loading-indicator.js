import React from 'react'
import {storiesOf} from '@storybook/react'

import LoadingIndicator from 'Component/loading-indicator'

storiesOf('Loading Indicator', module)
  .add('default', () => <LoadingIndicator />)
  .add('invert', () => (
    <div className="u-invert" style={{width: '100%', height: '100%'}}>
      <LoadingIndicator modifiers={['invert']} />
    </div>
  ))
