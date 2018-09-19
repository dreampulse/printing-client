import React from 'react'
import {storiesOf} from '@storybook/react'

import Headline from '../headline'

storiesOf('Headline', module)
  .add('default', () => <Headline label="Default Headline" />)
  .add('xs', () => <Headline label="Small Headline" modifiers={['xs']} />)
  .add('s', () => <Headline label="Small Headline" modifiers={['s']} />)
  .add('l', () => <Headline label="Large Headline" modifiers={['l']} />)
  .add('xl', () => <Headline label="Extra Large Headline" modifiers={['xl']} />)
  .add('disabled', () => <Headline label="Disabled Headline" modifiers={['xl', 'disabled']} />)
  .add('minor', () => <Headline label="Minor Headline" modifiers={['minor']} />)
  .add('light', () => <Headline label="Light Headline" modifiers={['light']} />)
  .add('invert', () => (
    <div className="u-invert" style={{width: '100%', 'min-height': '100vh'}}>
      <Headline label="Inverted Headline" modifiers={['invert']} />
    </div>
  ))
  .add('warning', () => <Headline label="Warning Headline" modifiers={['l', 'warning']} />)
