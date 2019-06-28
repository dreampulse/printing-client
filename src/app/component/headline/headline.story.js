import React from 'react'
import {storiesOf} from '@storybook/react'

import Headline from '../headline'

storiesOf('Headline', module)
  .add('default', () => <Headline label="Default Headline" />)
  .add('size: s', () => <Headline label="Small Headline" size="s" />)
  .add('size: l', () => <Headline label="Large Headline" size="l" />)
  .add('size: xl', () => <Headline label="Extra Large Headline" size="xl" />)
  .add('minor', () => <Headline label="Minor Headline" minor />)
  .add('light', () => <Headline label="Light Headline" light />)
  .add('primary', () => <Headline label="Primary Headline" primary />)
  .add('invert', () => (
    <div className="u-invert" style={{width: '100%', 'min-height': '100vh'}}>
      <Headline label="Inverted Headline" invert />
    </div>
  ))
  .add('warning', () => <Headline label="Warning Headline" warning size="l" />)
