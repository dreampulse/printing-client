import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Button from '../../src/app/component/button'

import placeholderIcon from '../../src/asset/icon/placeholder.svg'

storiesOf('Button', module)
  .add('default', () => <Button label="Default Button" onClick={action('click')} />)
  .add('disabled', () => <Button label="Disabled Button" disabled onClick={action('click')} />)
  .add('with icon', () => (
    <Button label="Button with Icon" icon={placeholderIcon} onClick={action('click')} />
  ))
  .add('text', () => <Button label="Text Button" modifiers={['text']} onClick={action('click')} />)
  .add('block', () => (
    <Button label="Block Button" modifiers={['block']} onClick={action('click')} />
  ))
  .add('compact', () => (
    <Button label="Compact Button" modifiers={['compact']} onClick={action('click')} />
  ))
  .add('selected', () => (
    <Button label="Selected Button" modifiers={['selected']} onClick={action('click')} />
  ))
  .add('invert', () => (
    <div className="u-invert" style={{width: '100%', 'min-height': '100vh'}}>
      <Button label="Inverted Button" modifiers={['invert']} onClick={action('click')} />
    </div>
  ))
