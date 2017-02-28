import React from 'react'
import {storiesOf} from '@kadira/storybook'

import Headline from 'Component/headline'

storiesOf('Headline', module)
  .add('default', () => (
    <Headline label="Default Headline" />
  ))
  .add('xs', () => (
    <Headline label="Small Headline" modifiers={['xs']} />
  ))
  .add('s', () => (
    <Headline label="Small Headline" modifiers={['s']} />
  ))
  .add('l', () => (
    <Headline label="Large Headline" modifiers={['l']} />
  ))
  .add('xl', () => (
    <Headline label="Extra Large Headline" modifiers={['xl']} />
  ))
  .add('disabled', () => (
    <Headline label="Disabled Headline" modifiers={['xl', 'disabled']} />
  ))
  .add('warning', () => (
    <Headline label="Warning Headline" modifiers={['l', 'warning']} />
  ))
