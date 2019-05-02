import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Button from '../button'
import ButtonBar from '.'

storiesOf('Button Bar', module)
  .add('default', () => (
    <ButtonBar>
      <Button label="Button" onClick={action('click')} />
      <Button label="Button" onClick={action('click')} />
      <Button label="Button" onClick={action('click')} />
    </ButtonBar>
  ))
  .add('l', () => (
    <ButtonBar l>
      <Button label="Button" onClick={action('click')} />
      <Button label="Button" onClick={action('click')} />
      <Button label="Button" onClick={action('click')} />
    </ButtonBar>
  ))
