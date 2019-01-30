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
  .add('text', () => <Button label="Text Button" text onClick={action('click')} />)
  .add('block', () => <Button label="Block Button" block onClick={action('click')} />)
  .add('compact', () => <Button label="Compact Button" compact onClick={action('click')} />)
  .add('tiny', () => <Button label="Tiny Button" tiny onClick={action('click')} />)
  .add('minor', () => <Button label="Minor Button" minor onClick={action('click')} />)
  .add('selected', () => <Button label="Selected Button" selected onClick={action('click')} />)
  .add('minor & disabled', () => (
    <Button label="Disabled Minor Button" disabled minor onClick={action('click')} />
  ))
  .add('minor & tiny', () => (
    <Button label="Tiny Minor Button" minor tiny onClick={action('click')} />
  ))
  .add('icon-only', () => <Button icon={placeholderIcon} onClick={action('click')} />)
  .add('icon-only & disabled', () => (
    <Button icon={placeholderIcon} disabled onClick={action('click')} />
  ))
