import React from 'react'
import {storiesOf} from '@kadira/storybook'
import centered from '@kadira/react-storybook-decorator-centered'

import Info from 'Component/info'
import Headline from 'Component/headline'
import Paragraph from 'Component/paragraph'

storiesOf('Info', module)
  .addDecorator(centered)
  .add('default', () => (
    <Info>
      <Headline modifiers={['s']} label="Headline" />
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </Paragraph>
    </Info>
  ))
  .add('minor', () => (
    <Info modifiers={['minor']}>
      <Headline modifiers={['s']} label="Headline" />
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </Paragraph>
    </Info>
  ))
