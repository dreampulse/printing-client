import PropTypes from 'prop-types'
import React from 'react'
import noop from 'lodash/noop'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'
import PositioningPortal from '../positioning-portal'

import basketIcon from '../../../asset/icon/basket.svg'

class CartNavLink extends React.Component {
  static propTypes = {
    ...propTypes.component,
    href: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    count: PropTypes.number,
    cartFlyout: PropTypes.node,
    delay: PropTypes.number
  }

  static defaultProps = {
    delay: 500,
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
    }, this.props.delay)
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
        portalContent={
          cartFlyout &&
          React.cloneElement(cartFlyout, {
            onMouseEnter: this.onEnter,
            onMouseLeave: this.onLeave
          })
        }
        isOpen={open > 0}
      >
        <a
          href={href}
          disabled={disabled}
          className={cn('CartNavLink', {zero: !count}, classNames)}
          onClick={handleClick}
          onMouseEnter={count > 0 ? this.onEnter : noop}
          onMouseLeave={count > 0 ? this.onLeave : noop}
        >
          <div className="CartNavLink__icon">
            <span className="CartNavLink__count">{count > 9 ? '9+' : count || '0'}</span>
            <Icon source={basketIcon} />
          </div>
          {label && <span className="CartNavLink__label">{label}</span>}
        </a>
      </PositioningPortal>
    )
  }
}

export default CartNavLink
