import React, {Component, PropTypes} from 'react'

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
    imageLoaded: false,
    imageError: false
  }

  componentDidMount () {
    this.loadImage(this.props.source)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.source !== this.props.source) {
      this.loadImage(nextProps.source)
    }
  }

  loadImage (source) {
    this.setState({
      imageLoading: true,
      imageLoaded: false,
      imageError: false
    })

    if (source) {
      preloadImage(source).then(() => {
        this.setState({
          imageLoading: false,
          imageLoaded: true
        })
      }).catch(() => {
        this.setState({
          imageLoading: false,
          imageError: true
        })
      })
    }
  }

  render () {
    const {
      source,
      modifiers = [],
      classNames
    } = this.props
    const {
      imageLoading,
      imageLoaded
    } = this.state

    const style = {}
    if (imageLoaded) {
      style.backgroundImage = `url(${source})`
    }

    const finalModifiers = [
      ...modifiers,
      {
        loaded: imageLoaded
      }
    ]

    return (
      <div className={buildClassName('image-container', finalModifiers, classNames)}>
        <div className="image-container__content">
          <div className="image-container__image" style={style} />
          {imageLoading && <LoadingIndicator modifiers={['invert']} />}
        </div>
      </div>
    )
  }
}
