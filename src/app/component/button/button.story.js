import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Button from '.'

import placeholderIcon from '../../../asset/icon/placeholder.svg'

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
  .add('tiny', () => <Button label="Tiny Button" modifiers={['tiny']} onClick={action('click')} />)
  .add('selected', () => (
    <Button label="Selected Button" modifiers={['selected']} onClick={action('click')} />
  ))
  .add('minor', () => (
    <Button label="Minor Button" modifiers={['minor']} onClick={action('click')} />
  ))
  .add('minor & disabled', () => (
    <Button
      label="Disabled Minor Button"
      disabled
      modifiers={['minor']}
      onClick={action('click')}
    />
  ))
  .add('minor & tiny', () => (
    <Button label="Tiny Minor Button" modifiers={['minor', 'tiny']} onClick={action('click')} />
  ))
  .add('invert', () => (
    <div className="u-invert" style={{width: '100%', minHeight: '100vh'}}>
      <Button label="Inverted Button" modifiers={['invert']} onClick={action('click')} />
    </div>
  ))
  .add('icon-only', () => (
    <Button icon={placeholderIcon} modifiers={['icon-only']} onClick={action('click')} />
  ))
  .add('icon-only & compact', () => (
    <Button icon={placeholderIcon} modifiers={['icon-only', 'compact']} onClick={action('click')} />
  ))
  .add('icon-only & tiny', () => (
    <Button icon={placeholderIcon} modifiers={['icon-only', 'tiny']} onClick={action('click')} />
  ))
  .add('icon-only & tiny & minor', () => (
    <Button
      icon={placeholderIcon}
      modifiers={['icon-only', 'tiny', 'minor']}
      onClick={action('click')}
    />
  ))
  .add('warning', () => (
    <Button label="Warning Button" modifiers={['warning']} onClick={action('click')} />
  ))
  .add('warning & disabled', () => (
    <Button label="Warning Button" disabled modifiers={['warning']} onClick={action('click')} />
  ))
