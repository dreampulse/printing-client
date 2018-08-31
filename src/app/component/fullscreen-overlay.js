import PropTypes from 'prop-types'
import React, {Component} from 'react'
import compact from 'lodash/compact'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import CloseButton from './close-button'

class FullscreenOverlay extends Component {
  static propTypes = {
    ...propTypes.component,
    closePortal: PropTypes.func,
    children: PropTypes.node
  }

  static defaultProps = {
    closePortal: () => {}
  }

  componentDidMount() {
    global.document.body.classList.add('u-prevent-scrolling')
  }

  componentWillUnmount() {
    global.document.body.classList.remove('u-prevent-scrolling')
  }

  render() {
    return (
      <section
        className={buildClassName(
          'fullscreen-overlay',
          this.props.modifiers,
          this.props.classNames
        )}
      >
        <CloseButton
          onClick={this.props.closePortal}
          modifiers={compact([
            'l',
            this.props.modifiers && this.props.modifiers.includes('invert') ? 'primary' : null
          ])}
        />
        <div className="fullscreen-overlay__content">{this.props.children}</div>
      </section>
    )
  }
}

export default FullscreenOverlay
