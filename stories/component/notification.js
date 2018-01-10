import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Notification from '../../src/app/component/notification'
import Button from '../../src/app/component/button'

const button = <Button label="Notification Button" onClick={action('onClick')} />

storiesOf('Notification', module)
  .add('default', () => <Notification message="A success notification" />)
  .add('warning', () => <Notification message="A warning notification" warning />)
  .add('with button', () => (
    <Notification message="A warning notification" warning button={button} />
  ))
  .add('with body', () => (
    <Notification message="A warning notification" button={button}>
      Notification body
    </Notification>
  ))
