import React from 'react'
import {storiesOf} from '@storybook/react'
import {withState} from '@dump247/storybook-state'

import ModalPortal from '.'
import Modal from '../modal'
import Headline from '../headline'
import Button from '../button'

const headline = <Headline label="Headline" size="l" />
const buttons = [<Button label="Cancel" text />, <Button label="OK" />]

storiesOf('ModalPortal', module).add(
  'default',
  withState({isOpen: false}, store => (
    <>
      <Button label="Open modal" onClick={() => store.set({isOpen: true})} />
      <ModalPortal isOpen={store.state.isOpen} onClose={() => store.set({isOpen: false})}>
        <Modal headline={headline} buttons={buttons} closePortal={() => store.set({isOpen: false})}>
          <div>Modal content</div>
        </Modal>
      </ModalPortal>
    </>
  ))
)
