import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Notification from '../../src/app/component/notification'
import Button from '../../src/app/component/button'

const button = () => (
  <Button label="Notification Button" onClick={action('click')} modifiers={['compact', 'minor']} />
)

storiesOf('Notification', module)
  .add('default', () => <Notification message="A success notification" />)
  .add('warning', () => <Notification message="A warning notification" warning />)
  .add('with button', () => (
    <Notification message="A warning notification" warning button={button()} />
  ))
  .add('with body', () => (
    <Notification message="A success notification" button={button()}>
      Basket subtotal (3 items):&nbsp;
      <strong>$123.00</strong>
    </Notification>
  ))