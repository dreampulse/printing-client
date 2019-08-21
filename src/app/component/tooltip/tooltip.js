import React from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import {CSSTransition} from 'react-transition-group'

import cn from '../../lib/class-names'

import PositioningPortal from '../positioning-portal'
import TooltipBaloon from '../tooltip-baloon'

// This has to be synced with the transition timeouts in the styles
const TRANSITION_TIMEOUT = 500

const POSITION = {
  BOTTOM: 'bottom',
  TOP: 'top',
  LEFT: 'left',
  RIGHT: 'right'
}

const positionStrategy = preferredPosition => (parentRect, portalRect) => {
  const scrollX = global.scrollX || global.pageXOffset
  const scrollY = global.scrollY || global.pageYOffset
  const body = global.document.documentElement || global.document.body

  const horizontalCenter = (parentRect.width - portalRect.width) / 2
  const verticalCenter = (parentRect.height - portalRect.height) / 2
  const additionalPadding = 8

  const positions = {
    [POSITION.BOTTOM]: {
      position: POSITION.BOTTOM,
      top: parentRect.top + parentRect.height + scrollY + additionalPadding,
      left: parentRect.left + scrollX + horizontalCenter,
      enoughSpace:
        parentRect.top + parentRect.height + portalRect.height + additionalPadding <
        body.clientHeight
    },
    [POSITION.TOP]: {
      position: POSITION.TOP,
      top: parentRect.top - portalRect.height + scrollY - additionalPadding,
      left: parentRect.left + scrollX + horizontalCenter,
      enoughSpace: parentRect.top - portalRect.height - additionalPadding > 0
    },
    [POSITION.LEFT]: {
      position: POSITION.LEFT,
      top: parentRect.top + scrollY + verticalCenter,
      left: parentRect.left + scrollX - portalRect.width - additionalPadding,
      enoughSpace: parentRect.left - portalRect.width - additionalPadding > 0
    },
    [POSITION.RIGHT]: {
      position: POSITION.RIGHT,
      top: parentRect.top + scrollY + verticalCenter,
      left: parentRect.left + scrollX + parentRect.width + additionalPadding,
      enoughSpace:
        parentRect.left + parentRect.width + portalRect.width + additionalPadding < body.clientWidth
    }
  }

  // Horizontal fallback preferred
  let sortedPositions = [
    positions[preferredPosition],
    positions[POSITION.BOTTOM],
    positions[POSITION.TOP],
    positions[POSITION.RIGHT],
    positions[POSITION.LEFT]
  ]

  // Vertical fallback preferred
  if (preferredPosition === POSITION.LEFT || preferredPosition === POSITION.RIGHT) {
    sortedPositions = [
      positions[preferredPosition],
      positions[POSITION.RIGHT],
      positions[POSITION.LEFT],
      positions[POSITION.BOTTOM],
      positions[POSITION.TOP]
    ]
  }

  const pickedPosition =
    find(sortedPositions, ({enoughSpace}) => enoughSpace) || positions[preferredPosition]

  const finalTop = Math.max(
    Math.min(pickedPosition.top, body.clientHeight + scrollY - portalRect.height),
    scrollY
  )
  const shiftY = finalTop - pickedPosition.top

  const finalLeft = Math.max(
    Math.min(pickedPosition.left, body.clientWidth + scrollX - portalRect.width),
    scrollX
  )
  const shiftX = finalLeft - pickedPosition.left

  return {
    top: Math.max(
      Math.min(pickedPosition.top, body.clientHeight + scrollY - portalRect.height),
      scrollY
    ),
    left: Math.max(
      Math.min(pickedPosition.left, body.clientWidth + scrollX - portalRect.width),
      scrollX
    ),
    position: {
      orientation: pickedPosition.position,
      shift:
        pickedPosition.position === 'top' || pickedPosition.position === 'bottom' ? shiftX : shiftY
    }
  }
}

class Tooltip extends React.Component {
  propTypes = {
    classNames: PropTypes.arrayOf(PropTypes.string),
    content: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    preferredPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    timeout: PropTypes.number
  }

  state = {
    isOpen: false,
    isHovered: false,
    closeOnLeave: false
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  onEnter = () => {
    this.setState({isHovered: true})
  }

  onLeave = () => {
    const {closeOnLeave} = this.state
    this.setState({isHovered: false})

    if (closeOnLeave) {
      this.close()
    }
  }

  open = () => {
    this.setState({isOpen: true})
  }

  close = () => {
    this.setState({isOpen: false})
    this.setState({closeOnLeave: false})
  }

  startTimeout = () => {
    const {timeout} = this.props

    if (!timeout) {
      return
    }

    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      const {isHovered} = this.state
      if (!isHovered) {
        this.close()
      } else {
        this.setState({closeOnLeave: true})
      }
    }, timeout)
  }

  timer = null

  render() {
    const {classNames, content, children, preferredPosition = 'top'} = this.props
    const {isOpen} = this.state
    return (
      <PositioningPortal
        isOpen={isOpen}
        onShouldClose={() => {
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.close()
        }}
        positionStrategy={positionStrategy(preferredPosition)}
        portalContent={({position, transitionStarted, transitionEnded}) => (
          <CSSTransition
            classNames="Tooltip--transition"
            timeout={TRANSITION_TIMEOUT}
            in={isOpen && !!position}
            onEnter={transitionStarted}
            onExited={transitionEnded}
          >
            <div className="Tooltip__portal">
              <TooltipBaloon
                position={position ? position.orientation : undefined}
                shift={position ? position.shift : undefined}
              >
                {content}
              </TooltipBaloon>
            </div>
          </CSSTransition>
        )}
      >
        <span
          className={cn('Tooltip', {}, classNames)}
          onClick={() => {
            this.open()
            this.startTimeout()
          }}
          onMouseEnter={this.onEnter}
          onMouseLeave={this.onLeave}
          onBlur={this.close}
        >
          {children}
        </span>
      </PositioningPortal>
    )
  }
}

export default Tooltip
