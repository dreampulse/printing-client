// import PropTypes from 'prop-types'
import React, {Component} from 'react'
import clamp from 'lodash/clamp'
import range from 'lodash/range'
import find from 'lodash/find'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'
import {tweenFromTo, easeInOutQuad} from 'Service/animate'

import SliderButton from './slider-button'
import Dot from './dot'

const ITEM_WIDTH = 245 + 20
// Shift item scroll pos to have nice space for navigation buttons
const ITEM_SCROLL_SHIFT = 0.5 * (1160 - Math.floor(1160 / ITEM_WIDTH) * ITEM_WIDTH)
const SCROLL_ANIMATION_DURATION = 500

export default class MaterialSlider extends Component {
  static propTypes = {
    ...propTypes.component
  }

  state = {
    showBack: false,
    showNext: false,
    numDots: 0,
    currentDotIndex: 0
  }

  componentDidMount() {
    this.canvasDom.addEventListener('scroll', this.updateButtonVisibilityState)
    this.canvasDom.addEventListener('scroll', this.updateDots)
    global.addEventListener('resize', this.updateButtonVisibilityState)
    global.addEventListener('resize', this.updateDots)

    this.reset()
  }

  componentDidUpdate(prevProps) {
    // Check if children changed
    // The only easy check is to test for MaterialCard titles
    if (
      prevProps.children.length !== this.props.children.length ||
      !prevProps.children.every(
        (child, index) => child.props.title === this.props.children[index].props.title
      )
    ) {
      this.reset()
    }
  }

  componentWillUnmount() {
    this.canvasDom.removeEventListener('scroll', this.updateButtonVisibilityState)
    this.canvasDom.removeEventListener('scroll', this.updateDots)
    global.removeEventListener('resize', this.updateButtonVisibilityState)
    global.removeEventListener('resize', this.updateDots)
  }

  getPageSize = () => {
    const sliderWidth = this.sliderDom.offsetWidth
    // Assume that at least one item is partially visible
    return Math.max(1, Math.floor(sliderWidth / ITEM_WIDTH))
  }

  getNumPages = () => {
    const numChildren = React.Children.count(this.props.children)
    return Math.ceil(numChildren / this.getPageSize())
  }

  getCurrentItemIndex = () => {
    const pos = this.canvasDom.scrollLeft
    return Math.ceil(pos / ITEM_WIDTH)
  }

  getCurrentPageIndex = () => {
    const index = this.getCurrentItemIndex()
    return Math.ceil(index / this.getPageSize())
  }

  getTargetPositionByIndex = indexOfItem => {
    const index = Math.max(0, indexOfItem)
    return clamp(
      index * ITEM_WIDTH - ITEM_SCROLL_SHIFT,
      0,
      this.canvasDom.scrollWidth - this.canvasDom.clientWidth
    )
  }

  updateButtonVisibilityState = () => {
    const updateState = (back, next) => {
      // Show buttons only if the scroll area is large enough
      const hasOverflow = this.canvasDom.scrollWidth !== this.canvasDom.clientWidth
      const showNext = hasOverflow ? next : false
      const showBack = hasOverflow ? back : false

      // Avoid unneeded state change
      if (this.state.showNext !== showNext) {
        this.setState({showNext})
      }
      if (this.state.showBack !== showBack) {
        this.setState({showBack})
      }
    }

    const pos = this.canvasDom.scrollLeft
    const maxWidth = this.canvasDom.scrollWidth - this.canvasDom.clientWidth
    if (pos <= 0) {
      // Position left
      updateState(false, true)
    } else if (pos >= maxWidth) {
      // Position right
      updateState(true, false)
    } else {
      // Somewhere between
      updateState(true, true)
    }
  }

  updateDots = () => {
    const scrollLeft = this.canvasDom.scrollLeft
    const numPages = this.getNumPages()
    const pageSize = this.getPageSize()

    let nextDotIndex =
      find(range(numPages), index => this.getTargetPositionByIndex(index * pageSize) > scrollLeft) -
      1

    // Edge case with last page
    if (scrollLeft >= this.canvasDom.scrollWidth - this.canvasDom.clientWidth) {
      nextDotIndex = numPages - 1
    }

    if (this.state.numDots !== numPages) {
      this.setState({
        numDots: numPages
      })
    }

    if (this.state.currentDotIndex !== nextDotIndex) {
      this.setState({
        currentDotIndex: nextDotIndex
      })
    }
  }

  startScrollAnimation = (startPosition, targetPosition) => {
    if (this.currentTween) {
      // Abort possible running animation
      this.currentTween.abort()
    }

    this.currentTween = tweenFromTo(
      startPosition,
      targetPosition,
      SCROLL_ANIMATION_DURATION,
      position => {
        this.canvasDom.scrollLeft = position
      },
      easeInOutQuad
    )
  }

  scrollTo = indexOfItem => {
    const startPosition = this.canvasDom.scrollLeft
    this.startScrollAnimation(startPosition, this.getTargetPositionByIndex(indexOfItem))
  }

  reset = () => {
    if (this.currentTween) {
      // Abort possible running animation
      this.currentTween.abort()
    }

    this.canvasDom.scrollLeft = 0

    this.updateButtonVisibilityState()
    this.updateDots()
  }

  handleBackClick = () => {
    this.scrollTo((this.getCurrentPageIndex() - 1) * this.getPageSize())
  }

  handleNextClick = () => {
    this.scrollTo((this.getCurrentPageIndex() + 1) * this.getPageSize())
  }

  renderNavigationButtons() {
    return [
      <div key="back" className="material-slider__back">
        <SliderButton modifiers={['back']} onClick={this.handleBackClick} />
      </div>,
      <div key="next" className="material-slider__next">
        <SliderButton onClick={this.handleNextClick} />
      </div>
    ]
  }

  renderDots() {
    const { numDots } = this.state

    // Needs a second render cycle
    if (!this.canvasDom || numDots <= 1) {
      return null
    }

    const pageSize = this.getPageSize()

    return (
      <ul className="material-slider__dots" role="presentation">
        {range(numDots).map(index => (
          <li key={index} role="presentation">
            <Dot
              modifiers={this.state.currentDotIndex === index ? ['active'] : undefined}
              index={index + 1}
              onClick={() => this.scrollTo(index * pageSize)}
            />
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {classNames, modifiers, children} = this.props
    const {showBack, showNext} = this.state
    const finalModifiers = [
      {
        'show-back': showBack,
        'show-next': showNext
      },
      modifiers
    ]

    return (
      <div className={buildClassName('material-slider', finalModifiers, classNames)}>
        <div
          className="material-slider__slider"
          ref={el => {
            this.sliderDom = el
          }}
        >
          <ul
            className="material-slider__canvas"
            ref={el => {
              this.canvasDom = el
            }}
          >
            {React.Children.map(children, (child, index) => (
              <li key={index} className="material-slider__item">
                {child}
              </li>
            ))}
          </ul>
        </div>
        {this.renderNavigationButtons()}
        {this.renderDots()}
      </div>
    )
  }
}
