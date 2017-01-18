import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import Button from '../../app/component/button'
import icon from '../../asset/icon/placeholder.svg'

storiesOf('Button', module)
  .add('default', () => (
    <Button label="Default Button" onClick={action('click')} />
  ))
  .add('disabled', () => (
    <Button label="Disabled Button" disabled onClick={action('click')} />
  ))
  .add('block', () => (
    <Button modifiers={['block']} label="Block Button" onClick={action('click')} />
  ))
  .add('large', () => (
    <Button modifiers={['l']} label="Large Button" onClick={action('click')} />
  ))
  .add('primary', () => (
    <Button modifiers={['primary']} label="Primary Button" onClick={action('click')} />
  ))
  .add('primary and large', () => (
    <Button modifiers={['primary', 'l']} label="Large Primary Button" onClick={action('click')} />
  ))
  .add('primary and disabled', () => (
    <Button modifiers={['primary']} label="Disabled Primary Button" disabled onClick={action('click')} />
  ))
  .add('minor', () => (
    <Button modifiers={['minor']} label="Minor Button" onClick={action('click')} />
  ))
  .add('minor and large', () => (
    <Button modifiers={['minor', 'l']} label="Large Minor Button" onClick={action('click')} />
  ))
  .add('minor and disabled', () => (
    <Button modifiers={['minor']} label="Disabled Minor Button" disabled onClick={action('click')} />
  ))
  .add('text', () => (
    <Button modifiers={['text']} label="Text Button" onClick={action('click')} />
  ))
  .add('text and large', () => (
    <Button modifiers={['text', 'l']} label="Large Text Button" onClick={action('click')} />
  ))
  .add('text and disabled', () => (
    <Button modifiers={['danger']} label="Disabled Danger Button" disabled onClick={action('click')} />
  ))
  .add('danger', () => (
    <Button modifiers={['danger']} label="Danger Button" onClick={action('click')} />
  ))
  .add('danger and large', () => (
    <Button modifiers={['danger', 'l']} label="Large Danger Button" onClick={action('click')} />
  ))
  .add('danger and disabled', () => (
    <Button modifiers={['danger']} label="Disabled Text Button" disabled onClick={action('click')} />
  ))
  .add('icon', () => (
    <Button label="Button With Icon" icon={icon} onClick={action('click')} />
  ))
