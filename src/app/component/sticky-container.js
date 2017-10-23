import PropTypes from 'prop-types'
import React from 'react'

import buildClassName from 'Lib/build-class-name'

// The sticky container wraps a child node and gives it a sticky behaviour.
class StickyContainer extends React.Component {
  static propTypes = {
    modifiers: PropTypes.arrayOf(PropTypes.string),
    classNames: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    modifiers: []
  }

  state = {
    sticky: false,
    height: 0
  }

  componentDidMount() {
    global.addEventListener('scroll', this.updateSticky, false)
  }

  componentWillUnmount() {
    global.removeEventListener('scroll', this.updateSticky, false)
  }

  updateSticky = () => {
    const {sticky} = this.state
    // Compute position of element
    const rect = this.el.getBoundingClientRect()

    if (sticky && rect.top >= 0) {
      this.setState({
        sticky: false
      })
    } else if (!sticky && rect.top < 0) {
      // Compute height of child
      const height = this.childEl.getBoundingClientRect().height

      this.setState({
        sticky: true,
        height
      })
    }
  }

  render() {
    const {sticky, height} = this.state
    const {children, classNames, modifiers} = this.props
    const finalModifiers = [{sticky}, ...modifiers]

    return (
      <div
        className={buildClassName('sticky-container', finalModifiers, classNames)}
        ref={el => {
          this.el = el
        }}
      >
        <div
          className="sticky-container__child"
          ref={el => {
            this.childEl = el
          }}
        >
          {children}
        </div>
        <div className="sticky-container__placeholder" style={{height: `${height}px`}} />
      </div>
    )
  }
}

export default StickyContainer
