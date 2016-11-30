import React from 'react'
import {storiesOf} from '@kadira/storybook'
import Headline from '../../app/component/headline'

storiesOf('Headline', module)
  .add('default', () => (
    <Headline label='Default Headline' />
  ))
  .add('s', () => (
    <Headline label='Small Headline' modifiers={['s']} />
  ))
  .add('l', () => (
    <Headline label='Large Headline' modifiers={['l']} />
  ))
  .add('xl', () => (
    <Headline label='Extra Large Headline' modifiers={['xl']} />
  ))
