import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

// The sticky container wraps a child node and gives it a sticky behaviour.
class StickyContainer extends React.Component {
  static propTypes = {
    ...propTypes.component,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    modifiers: []
  };

  state = {
    translateY: 0
  };

  componentDidMount () {
    global.addEventListener('scroll', this.updateSticky, false)
  }

  componentWillUnmount () {
    global.removeEventListener('scroll', this.updateSticky, false)
  }

  updateSticky = () => {
    // Compute position of element
    const rect = this.el.getBoundingClientRect()

    let translateY = 0
    if (rect.top < 0) {
      translateY = -1 * rect.top
    }

    this.setState({translateY})
  };

  render () {
    const {translateY} = this.state
    const {children, classNames, modifiers} = this.props

    return (
      <div
        className={buildClassName('sticky-container', modifiers, classNames)}
        ref={(el) => { this.el = el }}
      >
        <div
          className="sticky-container__child"
          style={{
            webkitTransform: `translateY(${translateY}px)`,
            transform: `translateY(${translateY}px)`
          }}
        >
          {children}
        </div>
      </div>
    )
  }
}

export default StickyContainer
