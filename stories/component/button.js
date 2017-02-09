import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import Button from '../../src/app/component/button'

import placeholderIcon from '../../src/asset/icon/placeholder.svg'

storiesOf('Button', module)
  .add('default', () => (
    <Button label="Default Button" onClick={action('click')} />
  ))
  .add('disabled', () => (
    <Button label="Disabled Button" disabled onClick={action('click')} />
  ))
  .add('with icon', () => (
    <Button label="Button with Icon" icon={placeholderIcon} onClick={action('click')} />
  ))
  .add('text', () => (
    <Button label="Text Button" modifiers={['text']} onClick={action('click')} />
  ))
  .add('block', () => (
    <Button label="Block Button" modifiers={['block']} onClick={action('click')} />
  ))
  .add('selected', () => (
    <Button label="Selected Button" modifiers={['selected']} onClick={action('click')} />
  ))
