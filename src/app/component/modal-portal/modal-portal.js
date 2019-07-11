import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Transition} from 'react-transition-group'
import {Portal} from 'react-portal'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

// This has to be synced with the transition timeouts in the styles
const TRANSITION_TIMEOUT = 0.3 * 1000

class ModalPortal extends Component {
  static propTypes = {
    ...propTypes.component,
    in: PropTypes.bool, // To stay compatible with TransitionGroup
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node
  }

  componentDidMount() {
    if (this.props.isOpen) {
      global.document.body.style.overflow = 'hidden'
    }

    global.addEventListener('keydown', this.onKeyDown, false)
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen && !prevProps.isOpen) {
      global.document.body.style.overflow = 'hidden'
    } else if (this.props.isOpen && !prevProps.isOpen) {
      global.document.body.style.overflow = ''
    }
  }

  componentWillUnmount() {
    global.document.body.style.overflow = ''

    global.removeEventListener('keydown', this.onKeyDown, false)
  }

  onKeyDown = event => {
    if (this.isOpen() && this.props.onClose && event.keyCode === 27) {
      this.props.onClose()
    }
  }

  isOpen = () => this.props.isOpen || this.props.in

  render() {
    const {classNames, onClose, children} = this.props

    return (
      <Transition
        in={this.isOpen()}
        appear
        timeout={TRANSITION_TIMEOUT}
        mountOnEnter
        unmountOnExit
        onEnter={node => node && node.scrollTop} // Force first paint before going into entering state!
      >
        {state => (
          <Portal>
            <div className={cn('ModalPortal', {[state]: !!state}, classNames)}>
              <div className="ModalPortal__content">{children}</div>
              <div className="ModalPortal__background" aria-hidden onClick={onClose} />
            </div>
          </Portal>
        )}
      </Transition>
    )
  }
}

export default ModalPortal
