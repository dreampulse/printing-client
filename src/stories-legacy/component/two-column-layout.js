import React from 'react'
import {storiesOf} from '@kadira/storybook'
import TwoColumnLayout from '../../app/component-legacy/two-column-layout'

storiesOf('Two column layout', module)
  .add('default', () => (
    <TwoColumnLayout>
      <div>
        <div style={{backgroundColor: '#eee'}}>
          Column 1
        </div>
      </div>
      <div>
        <div style={{backgroundColor: '#eee'}}>
          Column 2
        </div>
      </div>
    </TwoColumnLayout>
  ))

