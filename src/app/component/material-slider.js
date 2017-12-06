// import PropTypes from 'prop-types'
import React, {Component} from 'react'
import clamp from 'lodash/clamp'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'
import {tweenFromTo, easeInOutQuad} from 'Service/animate'

import SliderButton from './slider-button'

const ITEM_WIDTH = 250 + 20
const SCROLL_ANIMATION_DURATION = 300

export default class MaterialSlider extends Component {
  static propTypes = {
    ...propTypes.component
  }

  state = {
    showBack: false,
    showNext: false
  }

  componentDidMount() {
    this.canvasDom.addEventListener('scroll', this.updateButtonVisibilityState)
    global.addEventListener('resize', this.updateButtonVisibilityState)

    this.updateButtonVisibilityState()
  }

  componentWillUnmount() {
    this.canvasDom.removeEventListener('scroll', this.updateButtonVisibilityState)
    global.removeEventListener('resize', this.updateButtonVisibilityState)
  }

  getPageSize = () => {
    const sliderWidth = this.sliderDom.offsetWidth
    // Assume that at least one item is partially visible
    return Math.max(1, Math.floor(sliderWidth / ITEM_WIDTH))
  }

  getCurrentItemIndex = () => {
    const pos = this.canvasDom.scrollLeft
    return Math.ceil(pos / ITEM_WIDTH)
  }

  getCurrentPageIndex = () => {
    const index = this.getCurrentItemIndex()
    return Math.ceil(index / this.getPageSize())
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
    const index = Math.max(0, indexOfItem)
    const startPosition = this.canvasDom.scrollLeft
    const targetPosition = clamp(
      index * ITEM_WIDTH,
      0,
      this.canvasDom.scrollWidth - this.canvasDom.clientWidth
    )

    this.startScrollAnimation(startPosition, targetPosition)
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
      </div>
    )
  }
}
