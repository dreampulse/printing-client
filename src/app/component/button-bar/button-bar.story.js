import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Button from '../button'
import ButtonBar from '.'

storiesOf('ButtonBar', module)
  .add('default', () => (
    <ButtonBar>
      <Button label="Button" onClick={action('onClick')} />
      <Button label="Button" onClick={action('onClick')} />
      <Button label="Button" onClick={action('onClick')} />
    </ButtonBar>
  ))
  .add('l', () => (
    <ButtonBar l>
      <Button label="Button" onClick={action('onClick')} />
      <Button label="Button" onClick={action('onClick')} />
      <Button label="Button" onClick={action('onClick')} />
    </ButtonBar>
  ))
