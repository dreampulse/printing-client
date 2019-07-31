import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Button from '.'

import placeholderIcon from '../../../asset/icon/placeholder.svg'

storiesOf('Button', module)
  .add('default', () => <Button label="Default Button" onClick={action('onClick')} />)
  .add('disabled', () => <Button label="Disabled Button" disabled onClick={action('onClick')} />)
  .add('with icon', () => (
    <Button label="Button with Icon" icon={placeholderIcon} onClick={action('onClick')} />
  ))
  .add('text', () => <Button label="Text Button" text onClick={action('onClick')} />)
  .add('block', () => <Button label="Block Button" block onClick={action('onClick')} />)
  .add('compact', () => <Button label="Compact Button" compact onClick={action('onClick')} />)
  .add('tiny', () => <Button label="Tiny Button" tiny onClick={action('onClick')} />)
  .add('selected', () => <Button label="Selected Button" selected onClick={action('onClick')} />)
  .add('minor', () => <Button label="Minor Button" minor onClick={action('onClick')} />)
  .add('minor & disabled', () => (
    <Button label="Disabled Minor Button" disabled minor onClick={action('onClick')} />
  ))
  .add('minor & tiny', () => (
    <Button label="Tiny Minor Button" minor tiny onClick={action('onClick')} />
  ))
  .add('iconOnly', () => <Button icon={placeholderIcon} iconOnly onClick={action('onClick')} />)
  .add('iconOnly & disabled', () => (
    <Button icon={placeholderIcon} disabled iconOnly onClick={action('onClick')} />
  ))

  .add('href', () => (
    <Button href="https://google.com" label="Default Button" onClick={action('onClick')} />
  ))
