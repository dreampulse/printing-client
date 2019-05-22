import PropTypes from 'prop-types'
import React from 'react'
import noop from 'lodash/noop'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'
import PositioningPortal from '../positioning-portal'

import basketIcon from '../../../asset/icon/basket.svg'

// Needs to be synced with the styles
const FLYOUT_TRANSITION_TIMEOUT = 300
const COUNT_TRANSITION_TIMEOUT = 500

const FLYOUT_CLOSING_DELAY = 500

class CartNavLink extends React.Component {
  static propTypes = {
    ...propTypes.component,
    href: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    count: PropTypes.number,
    cartFlyout: PropTypes.node
  }

  static defaultProps = {
    count: 0,
    onClick: noop
  }

  state = {
    open: 0
  }

  onEnter = () => {
    this.setState({
      open: this.state.open + 1
    })
  }

  onLeave = () => {
    setTimeout(() => {
      this.setState({
        open: this.state.open - 1
      })
    }, FLYOUT_CLOSING_DELAY)
  }

  render() {
    const {
      classNames,
      label,
      count,
      cartFlyout,
      href = '#',
      disabled = false,
      onClick = noop
    } = this.props

    const {open} = this.state

    const handleClick = event => {
      event.preventDefault()
      if (count === 0) {
        return
      }
      onClick(event, href)
    }

    return (
      <PositioningPortal
        positionStrategy={(parentRect, portalRect) => {
          const horizontalCenter = (parentRect.width - portalRect.width) / 2
          return {
            position: 'bottom',
            top: parentRect.top + parentRect.height + global.scrollY,
            left: parentRect.left + global.scrollX + horizontalCenter,
            enoughSpace: true
          }
        }}
        portalContent={({isOpen, transitionStarted, transitionEnded, position}) => (
          <CSSTransition
            classNames="CartNavLink--transition"
            timeout={FLYOUT_TRANSITION_TIMEOUT}
            in={isOpen && !!position}
            onEnter={transitionStarted}
            onExited={transitionEnded}
          >
            <div
              className="CartNavLink__portal"
              onMouseEnter={this.onEnter}
              onMouseLeave={this.onLeave}
            >
              {cartFlyout}
            </div>
          </CSSTransition>
        )}
        isOpen={cartFlyout && open > 0}
      >
        <a
          href={href}
          disabled={disabled}
          className={cn('CartNavLink', {zero: !count}, classNames)}
          onClick={handleClick}
          onMouseEnter={cartFlyout ? this.onEnter : noop}
          onMouseLeave={cartFlyout ? this.onLeave : noop}
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
