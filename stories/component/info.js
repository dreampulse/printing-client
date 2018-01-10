import React from 'react'
import {storiesOf} from '@storybook/react'
import centered from '@storybook/addon-centered'

import Info from '../../src/app/component/info'
import Headline from '../../src/app/component/headline'
import Paragraph from '../../src/app/component/paragraph'

storiesOf('Info', module)
  .addDecorator(centered)
  .add('default', () => (
    <Info>
      <Headline modifiers={['s']} label="Headline" />
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
    </Info>
  ))
  .add('minor', () => (
    <Info modifiers={['minor']}>
      <Headline modifiers={['s']} label="Headline" />
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
    </Info>
  ))
