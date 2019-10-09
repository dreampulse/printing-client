import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Notification from '.'
import Button from '../button'

const button = () => (
  <Button label="Notification Button" onClick={action('onClick')} compact minor />
)

storiesOf('Notification', module)
  .add('default', () => <Notification message="A success notification" />)
  .add('warning', () => <Notification message="A warning notification" type="warning" />)
  .add('error', () => <Notification message="A warning notification" type="error" />)
  .add('with button', () => (
    <Notification message="A warning notification" type="warning" button={button()} />
  ))
  .add('with body', () => (
    <Notification message="A success notification" button={button()}>
      Basket subtotal (3 items):&nbsp;
      <strong>$123.00</strong>
    </Notification>
  ))
