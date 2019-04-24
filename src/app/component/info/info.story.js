import React from 'react'
import {storiesOf} from '@storybook/react'
import centered from '@storybook/addon-centered'

import Info from '.'
import Headline from '../headline'
import Paragraph from '../paragraph'

storiesOf('Info', module)
  .addDecorator(centered)
  .add('default', () => (
    <Info>
      <Headline label="Headline" />
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
    </Info>
  ))
  .add('minor', () => (
    <Info modifiers={['minor']}>
      <Headline label="Headline" />
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
    </Info>
  ))
