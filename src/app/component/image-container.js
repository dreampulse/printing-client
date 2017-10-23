import PropTypes from 'prop-types'
import React, {Component} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'
import preloadImage from 'Service/preload-image'

import LoadingIndicator from 'Component/loading-indicator'

export default class ImageContainer extends Component {
  static propTypes = {
    ...propTypes.component,
    source: PropTypes.string
  }

  state = {
    imageLoading: false,
    imageLoaded: false
  }

  componentDidMount() {
    this.loadImage(this.props.source)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.source !== this.props.source) {
      this.loadImage(nextProps.source)
    }
  }

  componentWillUnmount() {
    this.unmounted = true
  }

  getGradient = element => {
    if (element) {
      this.gradient = global.getComputedStyle(element, null).getPropertyValue('background-image')
    }
  }

  loadImage(source) {
    this.setState({
      imageLoading: true,
      imageLoaded: false
    })

    if (source) {
      preloadImage(source)
        .then(() => {
          if (!this.unmounted) {
            this.setState({
              imageLoading: false,
              imageLoaded: true
            })
          }
        })
        .catch(() => {
          if (!this.unmounted) {
            this.setState({
              imageLoading: false
            })
          }
        })
    }
  }

  render() {
    const {source, modifiers = [], classNames} = this.props
    const {imageLoading, imageLoaded} = this.state

    const style = {}
    if (this.gradient && imageLoaded) {
      // Add gradient so that we can use css blend modes
      style.backgroundImage = `url(${source}), ${this.gradient}`
    }

    const finalModifiers = [
      ...modifiers,
      {
        loaded: imageLoaded
      }
    ]

    return (
      <div
        className={buildClassName('image-container', finalModifiers, classNames)}
        ref={this.getGradient}
      >
        <div className="image-container__content">
          <div className="image-container__image" style={style} />
          {imageLoading && <LoadingIndicator modifiers={['invert']} />}
        </div>
      </div>
    )
  }
}
