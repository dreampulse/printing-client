import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Modal from '.'
import Headline from '../headline'
import Button from '../button'

const buttons = () => [<Button key="cancel" label="Cancel" text />, <Button key="ok" label="OK" />]

storiesOf('Modal', module)
  .add('default', () => (
    <Modal headline={<Headline label="Modal Headline" size="l" />} buttons={buttons()}>
      <div>Modal content</div>
    </Modal>
  ))
  .add('size: l', () => (
    <Modal size="l" headline={<Headline label="Modal Headline" size="l" />} buttons={buttons()}>
      <div>Modal content</div>
    </Modal>
  ))
  .add('onClose', () => (
    <Modal
      headline={<Headline label="Modal Headline" size="l" />}
      buttons={buttons()}
      onClose={action('onClose')}
    >
      <div>Modal content</div>
    </Modal>
  ))
