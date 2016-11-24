import React, {Component} from 'react';
import {storiesOf} from '@kadira/storybook';

import Portal from '../../app/component/portal';
import Modal from '../../app/component/modal';
import Button from '../../app/component/button';

class MyPortal extends Component {

  state = {
    isOpen: false
  };

  handleOnClose = () => {
    this.setState({isOpen: false});
  };

  handleOnOpen = () => {
    this.setState({isOpen: true});
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleOnOpen} label="open" />
        <Portal modifiers={['modal']} isOpen={this.state.isOpen} onRequestClose={this.handleOnClose}>
          <Modal title="My title" onClose={this.handleOnClose}>
            Some content
          </Modal>
        </Portal>
      </div>
    );
  }
}

storiesOf('Portal', module)
  .add('default', () => (
    <MyPortal />
  ))
;
