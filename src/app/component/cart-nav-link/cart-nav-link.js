import PropTypes from 'prop-types'
import React from 'react'
import noop from 'lodash/noop'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'
import PositioningPortal from '../positioning-portal'
import CartFlyout from '../cart-flyout'

import basketIcon from '../../../asset/icon/basket.svg'

// Needs to be synced with the styles
const FLYOUT_NOTIFY_TRANSITION_DELAY = 1000
const FLYOUT_TRANSITION_TIMEOUT = 300
const COUNT_TRANSITION_TIMEOUT = 500

const FLYOUT_CLOSING_DELAY = 500
const FLYOUT_NOTIFY_DELAY = 4000

class CartNavLink extends React.Component {
  static propTypes = {
    ...propTypes.component,
    href: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    count: PropTypes.number,
    children: PropTypes.node
  }

  static defaultProps = {
    count: 0,
    onClick: noop
  }

  state = {
    open: 0,
    notify: false,
    prevChildren: []
  }

  componentDidUpdate(prevProps) {
    if (React.Children.count(prevProps.children) < React.Children.count(this.props.children)) {
      this.doNotify(React.Children.map(prevProps.children, child => child.props.id))
    }
  }

  componentWillUnmount() {
    if (this.notifyTimeout) {
      clearTimeout(this.notifyTimeout)
    }

    if (this.leaveTimeout) {
      clearTimeout(this.leaveTimeout)
    }
  }

  onEnter = () => {
    this.setState({
      open: this.state.open + 1
    })
  }

  onEnded = () => {
    if (this.state.notify) {
      this.setState({
        notify: false
      })
    }
  }

  onLeave = () => {
    this.leaveTimeout = setTimeout(() => {
      this.setState({
        open: this.state.open - 1
      })
    }, FLYOUT_CLOSING_DELAY)
  }

  notifyTimeout = null
  leaveTimeout = null

  doNotify = prevChildren => {
    this.setState({
      open: this.state.open + 1,
      notify: true,
      prevChildren
    })

    this.notifyTimeout = setTimeout(() => {
      this.setState({
        open: this.state.open - 1
      })
    }, FLYOUT_NOTIFY_DELAY)
  }

  render() {
    const {
      classNames,
      label,
      count,
      children,
      href = '#',
      disabled = false,
      onClick = noop
    } = this.props

    const {open, notify, prevChildren} = this.state

    const handleClick = event => {
      event.preventDefault()
      if (count === 0) {
        return
      }
      onClick(event, href)
    }

    const itemDiff = React.Children.count(children) - prevChildren.length
    const flyoutTitle = notify
      ? `${itemDiff} ${itemDiff > 1 ? 'files' : 'file'} added to your cart`
      : `${React.Children.count(children)} ${
          React.Children.count(children) > 1 ? 'files' : 'file'
        } in your cart`

    return (
      <PositioningPortal
        positionStrategy={(parentRect, portalRect) => {
          const horizontalCenter = (parentRect.width - portalRect.width) / 2
          return {
            position: 'bottom',
            top: parentRect.top + parentRect.height + global.scrollY,
            left: parentRect.left + global.scrollX + horizontalCenter
          }
        }}
        portalContent={({isOpen, transitionStarted, transitionEnded, position}) => (
          <CSSTransition
            classNames="CartNavLink--transition"
            timeout={FLYOUT_TRANSITION_TIMEOUT + (notify ? FLYOUT_NOTIFY_TRANSITION_DELAY : 0)}
            in={isOpen && !!position}
            onEnter={transitionStarted}
            onExited={() => {
              transitionEnded()
              this.onEnded()
            }}
          >
            <div
              className="CartNavLink__portal"
              onMouseEnter={this.onEnter}
              onMouseLeave={this.onLeave}
            >
              {React.Children.count(children) > 0 && (
                <CartFlyout notify={notify} title={flyoutTitle}>
                  {React.Children.toArray(children)
                    .filter(child => prevChildren.indexOf(child.props.id) === -1)
                    .map(child =>
                      React.cloneElement(child, {
                        selected: notify && prevChildren.indexOf(child.props.id) === -1
                      })
                    )}
                  {React.Children.toArray(children).filter(
                    child => prevChildren.indexOf(child.props.id) > -1
                  )}
                </CartFlyout>
              )}
            </div>
          </CSSTransition>
        )}
        isOpen={React.Children.count(children) > 0 && open > 0}
      >
        <a
          href={href}
          disabled={disabled}
          className={cn('CartNavLink', {zero: !count, notify}, classNames)}
          onClick={handleClick}
          onMouseEnter={React.Children.count(children) > 0 ? this.onEnter : noop}
          onMouseLeave={React.Children.count(children) > 0 ? this.onLeave : noop}
        >
          <div className="CartNavLink__icon">
            <TransitionGroup>
              <CSSTransition
                key={count}
                timeout={COUNT_TRANSITION_TIMEOUT}
                classNames="CartNavLink--count-transition"
              >
                <span className="CartNavLink__count">{count > 9 ? '9+' : count || '0'}</span>
              </CSSTransition>
            </TransitionGroup>
            <Icon source={basketIcon} />
          </div>
          {label && <span className="CartNavLink__label">{label}</span>}
        </a>
      </PositioningPortal>
    )
  }
}

export default CartNavLink
