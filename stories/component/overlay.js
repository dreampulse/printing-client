import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import Overlay from '../../src/app/component/overlay'
import Headline from '../../src/app/component/headline'
import Button from '../../src/app/component/button'

const headline = (<Headline label="Warning Headline" modifiers={['l', 'warning']} />)
const headlineOther = (<Headline label="Overlay Headline" modifiers={['l']} />)
const buttons = [
  (<Button label="Cancel" modifiers={['text']} />),
  (<Button label="OK" />)
]

storiesOf('Overlay', module)
  .add('default', () => (
    <Overlay headline={headline} buttons={buttons} closePortal={action('onClose')}>
      <div>
        Overlay content
      </div>
    </Overlay>
  ))
  .add('large', () => (
    <Overlay modifiers={['l']} headline={headlineOther} buttons={buttons} closePortal={action('onClose')}>
      <div>Overlay content</div>
    </Overlay>
  ))
