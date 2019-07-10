import React from 'react'
import {storiesOf} from '@storybook/react'
import {withState} from '@dump247/storybook-state'

import ModalPortal from '.'
import Modal from '../modal'
import Headline from '../headline'
import Button from '../button'

storiesOf('ModalPortal', module).add(
  'default',
  withState({isOpen: false}, store => (
    <>
      <Button label="Open modal" onClick={() => store.set({isOpen: true})} />
      <ModalPortal isOpen={store.state.isOpen} onClose={() => store.set({isOpen: false})}>
        <Modal
          headline={<Headline label="Headline" size="l" />}
          buttons={[<Button key="cancel" label="Cancel" text />, <Button key="ok" label="OK" />]}
          onClose={() => store.set({isOpen: false})}
        >
          <div>Modal content</div>
        </Modal>
      </ModalPortal>
    </>
  ))
)
