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
      <Headline label="Headline" />
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
    </Tooltip>
  ))
  .add('orientation right', () => (
    <Tooltip orientation="right">
      <Headline label="Headline" />
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
    </Tooltip>
  ))
  .add('orientation top', () => (
    <Tooltip orientation="top">
      <Headline label="Headline" />
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
    </Tooltip>
  ))
  .add('orientation bottom', () => (
    <Tooltip orientation="bottom">
      <Headline label="Headline" />
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
    </Tooltip>
  ))
