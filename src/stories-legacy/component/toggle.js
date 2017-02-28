import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import Toggle from '../../app/component-legacy/toggle'

storiesOf('Toggle', module)
  .add('default', () => (
    <Toggle onChange={action('change')} label="Some Label" />
  ))
  .add('secondary', () => (
    <Toggle modifiers={['secondary']} onChange={action('change')} />
  ))
  .add('checked', () => (
    <Toggle checked onChange={action('change')} />
  ))
  .add('value true', () => (
    <Toggle value onChange={action('change')} />
  ))
  .add('block', () => (
    <Toggle modifiers={['block']} label="Some Label" />
  ))

