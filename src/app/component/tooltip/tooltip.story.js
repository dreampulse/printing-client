import React from 'react'
import {storiesOf} from '@storybook/react'
import centered from '@storybook/addon-centered'

import Tooltip from '.'
import Headline from '../headline'
import Paragraph from '../paragraph'

storiesOf('Tooltip', module)
  .addDecorator(centered)
  .add('default', () => (
    <Tooltip>
      <Headline modifiers={['s']} label="Headline" />
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
    </Tooltip>
  ))
  .add('right', () => (
    <Tooltip modifiers={['right']}>
      <Headline modifiers={['s']} label="Headline" />
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
    </Tooltip>
  ))
