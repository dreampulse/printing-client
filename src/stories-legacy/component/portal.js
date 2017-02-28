import React, {Component} from 'react'
import {storiesOf} from '@kadira/storybook'

import Portal from '../../app/component-legacy/portal'
import Modal from '../../app/component-legacy/modal'
import Button from '../../app/component-legacy/button'

class MyPortal extends Component {

  state = {
    isOpen: false
  };

  handleOnClose = () => {
    this.setState({isOpen: false})
  };

  handleOnOpen = () => {
    this.setState({isOpen: true})
  };

  render () {
    return (
      <div>
        <Button onClick={this.handleOnOpen} label="open" />
        <Portal modifiers={['modal']} isOpen={this.state.isOpen} onRequestClose={this.handleOnClose}>
          <Modal title="My title" onClose={this.handleOnClose}>
            Some content
          </Modal>
        </Portal>
      </div>
    )
  }
}

storiesOf('Portal', module)
  .add('default', () => (
    <MyPortal />
  ))

