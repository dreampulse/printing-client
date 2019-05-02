import * as React from 'react'
import PropTypes from 'prop-types'
import * as ReactDOM from 'react-dom'
import {Portal} from 'react-portal'
import {noop} from 'lodash'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'
import {getScrollParents} from '../../lib/service/scroll-parent'

const renderProps = (element, props) => (typeof element === 'function' ? element(props) : element)

export const POSITION = {
  ABOVE_LEFT: 'ABOVE_LEFT',
  ABOVE_RIGHT: 'ABOVE_RIGHT',
  BELOW_LEFT: 'BELOW_LEFT',
  BELOW_RIGHT: 'BELOW_RIGHT'
}

const defaultPositionStrategy = (parentRect, portalRect /* , props */) => {
  // Open the content portal above the child if there is not enough space to the bottom,
  // but if there also isn't enough space at the top, open to the bottom.
  const openAbove =
    parentRect.top + parentRect.height + portalRect.height >
      (global.document.documentElement || global.document.body).clientHeight &&
    parentRect.top - portalRect.height > 0

  const top = openAbove
    ? parentRect.top - portalRect.height + global.scrollY
    : parentRect.top + parentRect.height + global.scrollY

  // Open the content portal to the left if there is not enough space at the right,
  // but if there also isn't enough space at the right, open to the left.
  const alignRight =
    parentRect.left + portalRect.width >
      (global.document.documentElement || global.document.body).clientWidth &&
    parentRect.left - portalRect.width > 0

  const left = !alignRight
    ? parentRect.left + global.scrollX
    : global.scrollX + parentRect.left - portalRect.width + parentRect.width

  let position = POSITION.BELOW_RIGHT
  if (openAbove && left) {
    position = POSITION.ABOVE_LEFT
  }
  if (openAbove && !left) {
    position = POSITION.ABOVE_RIGHT
  }
  if (!openAbove && left) {
    position = POSITION.BELOW_LEFT
  }
  if (!openAbove && !left) {
    position = POSITION.BELOW_RIGHT
  }

  return {
    top,
    left,
    position
  }
}

class PositioningPortal extends React.Component {
  static propTypes = {
    ...propTypes.component,
    children: PropTypes.element.isRequired,
    /**
     * The content of the portal. A react element or a renderprop with signature: ({close, isOpen, position, state}) => React.Element
     * close(): This function closes the portal.
     * isOpen: A bool variable, whether the portal is open or closed.
     * position: An enum for the current position of the portal (provided by the positionStrategy).
     * relatedWidth: Width of the element in the children property. Use this width to give the portalContent the same width.
     * transitionStarted(): Call on open if the portal has a transition.
     * transitionEnded(): Call after close when portal transition ended. transitionStarted() has to have been called before.
     */
    portalContent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onShouldClose: PropTypes.func,
    /**
     * Optional positioning strategy.
     * Call signature: (parentRect, portalRect, props) => { left, top, position }
     */
    positionStrategy: PropTypes.func
  }

  static defaultProps = {
    isOpen: false,
    onOpen: noop,
    onShouldClose: noop,
    positionStrategy: defaultPositionStrategy
  }

  state = {
    top: null,
    left: null,
    portalRect: null,
    parentRect: null,
    isPositioned: false,
    isOpen: false,
    transitionActive: false,
    scrollParents: [],
    position: null
  }

  componentDidMount() {
    global.document.addEventListener('click', this.handleOutsideMouseClick, false)

    if (this.props.isOpen) {
      this.onOpen()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      if (this.props.isOpen) {
        this.onOpen()
      } else {
        this.onClose()
      }
    }
  }

  componentWillUnmount() {
    global.document.removeEventListener('click', this.handleOutsideMouseClick, false)

    // Remove scroll event listeners
    this.state.scrollParents.forEach(node => node.removeEventListener('scroll', this.close, false))
  }

  onOpen = () => {
    if (!this.state.isOpen) {
      // 1) Prerender portal to get stable portal rect.
      this.preRenderPortal()
        // 2) Position portal with positioning strategy and trigger final render
        .then(this.finalRenderPortal)
        // 3) Communicate that portal has opened
        .then(() => {
          this.props.onOpen()
        })
    }
  }

  onClose = () => {
    if (!this.state.isOpen) {
      return
    }

    // Remove scroll event listeners
    this.state.scrollParents.forEach(node => node.removeEventListener('scroll', this.close, false))

    this.setState({
      isOpen: false,
      scrollParents: []
    })
  }

  handleOutsideMouseClick = event => {
    if (!this.state.isOpen) {
      return
    }

    if (this.portalRef.current && this.portalRef.current.contains(event.target)) {
      return
    }

    const parentDom = ReactDOM.findDOMNode(this) // eslint-disable-line react/no-find-dom-node
    if (parentDom && parentDom.contains(event.target)) {
      return
    }

    this.close()
  }

  portalRef = React.createRef()

  close = () => {
    if (this.props.onShouldClose) {
      this.props.onShouldClose()
    }
  }

  transitionStarted = () => {
    this.setState({transitionActive: true})
  }

  transitionEnded = () => {
    this.setState({transitionActive: false})
  }

  preRenderPortal = () =>
    new Promise(resolve => {
      // A tricky way to get the first child DOM element of the fragment of this component.
      // Unfortunately there seems to be no way to achieve this with refs.
      const parentDom = ReactDOM.findDOMNode(this) // eslint-disable-line react/no-find-dom-node

      if (parentDom && parentDom.nodeType === global.Node.ELEMENT_NODE) {
        const parentRect = parentDom.getBoundingClientRect()

        let scrollParents = []
        // Register scroll listener on all scrollable parents to close the portal on scroll
        scrollParents = getScrollParents(parentDom)
        scrollParents.forEach(node => node.addEventListener('scroll', this.close, false))

        this.setState(
          {
            isOpen: true,
            transitionActive: false,
            isPositioned: false,
            left: 0,
            top: 0,
            position: null,
            parentRect,
            portalRect: null,
            scrollParents
          },
          resolve
        )
      } else {
        resolve()
      }
    })

  finalRenderPortal = () =>
    new Promise(resolve => {
      if (
        this.state.isOpen &&
        !this.state.isPositioned &&
        this.portalRef.current &&
        this.state.parentRect
      ) {
        const portalRect = this.portalRef.current.getBoundingClientRect()

        const {top, left, position} = (this.props.positionStrategy || defaultPositionStrategy)(
          this.state.parentRect,
          portalRect,
          this.props
        )

        this.setState(
          {
            isPositioned: true,
            left,
            position,
            top,
            portalRect
          },
          resolve
        )
      } else {
        resolve()
      }
    })

  render() {
    const {children, portalContent, classNames} = this.props
    const {
      top,
      left,
      parentRect,
      portalRect,
      isPositioned,
      isOpen,
      position,
      transitionActive
    } = this.state
    const relatedWidth = parentRect ? parentRect.width : 0

    const portalStyle = {
      width: portalRect ? `${portalRect.width}px` : 'auto',
      left: `${left}px`,
      top: `${top}px`
    }

    const renderPortal = () => (
      <Portal>
        <div
          className={cn('PositioningPortal', {isPositioned}, classNames)}
          ref={this.portalRef}
          style={portalStyle}
        >
          {renderProps(portalContent, {
            close: this.close,
            transitionStarted: this.transitionStarted,
            transitionEnded: this.transitionEnded,
            position,
            isOpen,
            relatedWidth
          })}
        </div>
      </Portal>
    )

    return (
      <>
        {children}
        {(isOpen || transitionActive) && renderPortal()}
      </>
    )
  }
}

export default PositioningPortal
