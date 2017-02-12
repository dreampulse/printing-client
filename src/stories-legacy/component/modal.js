import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import Modal from '../../app/component-legacy/modal'

storiesOf('Modal', module)
  .add('default', () => (
    <Modal title="My Title" onClose={action('close')}>
      Some content
    </Modal>
  ))

