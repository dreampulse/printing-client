import React, {PropTypes, Component, cloneElement} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Icon from 'Component/icon'
import closeIcon from 'Icon/close.svg'

class Overlay extends Component {

  static propTypes = {
    ...propTypes.component,
    closePortal: PropTypes.func,
    closeable: PropTypes.bool,
    children: PropTypes.node,
    headline: PropTypes.node.isRequired,
    buttons: PropTypes.arrayOf(
      PropTypes.node
    )
  }

  static defaultProps = {
    closePortal: () => {},
    closeable: true
  }

  componentDidMount () {
    global.document.body.classList.add('u-prevent-scrolling')
  }

  componentWillUnmount () {
    global.document.body.classList.remove('u-prevent-scrolling')
  }

  render () {
    return (
      <div className={buildClassName('overlay', this.props.modifiers, this.props.classNames)}>
        <div className="overlay__mask" onClick={this.props.closePortal}>
          <div className="overlay__modal" onClick={e => e.stopPropagation()}>

            <header className="overlay__header">
              <div className="overlay__headline">
                {this.props.headline}
                {this.props.closeable &&
                  <button onClick={this.props.closePortal} className="overlay__close">
                    <Icon source={closeIcon} />
                  </button>
                }
              </div>
            </header>

            <div className="overlay__content">
              {this.props.children}
            </div>

            <footer className="overlay__footer">
              {
                React.Children.map(
                  this.props.buttons, button => cloneElement(button, {key: button.key})
                )
              }
            </footer>
          </div>
        </div>
      </div>
    )
  }
}

export default Overlay
