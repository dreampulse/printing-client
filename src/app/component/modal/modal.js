import PropTypes from 'prop-types'
import React, {Component, cloneElement} from 'react'
import noop from 'lodash/noop'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

import CloseButton from '../close-button'

class Modal extends Component {
  static propTypes = {
    ...propTypes.component,
    l: PropTypes.bool,
    closePortal: PropTypes.func,
    closeable: PropTypes.bool,
    children: PropTypes.node,
    headline: PropTypes.node.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.node),
    noCloseOnClickOutside: PropTypes.bool,
    scrollContainerId: PropTypes.string
  }

  static defaultProps = {
    closePortal: () => {},
    closeable: true,
    noCloseOnClickOutside: false
  }

  componentDidMount() {
    global.document.body.classList.add('u-prevent-scrolling')
  }

  componentWillUnmount() {
    global.document.body.classList.remove('u-prevent-scrolling')
  }

  render() {
    const {
      l,
      classNames,
      closePortal,
      noCloseOnClickOutside,
      children,
      headline,
      closeable,
      scrollContainerId,
      buttons
    } = this.props

    return (
      <section className={buildClassName('Modal', {l}, classNames)}>
        <div className="Modal__mask" onClick={!noCloseOnClickOutside ? closePortal : noop}>
          <div id={scrollContainerId} className="Modal__modal" onClick={e => e.stopPropagation()}>
            <header className="Modal__header">
              <div className="Modal__headline">
                {headline}
                {closeable && <CloseButton onClick={closePortal} />}
              </div>
            </header>

            <div className="Modal__content">{children}</div>

            <footer className="Modal__footer">
              {React.Children.map(buttons, button => cloneElement(button, {key: button.key}))}
            </footer>
          </div>
        </div>
      </section>
    )
  }
}

export default Modal
