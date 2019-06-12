import PropTypes from 'prop-types'
import React, {Component} from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import {createPollHandle} from '../../service/image'

export default class ImageContainer extends Component {
  static propTypes = {
    ...propTypes.component,
    // Required for a11y purposes
    alt: PropTypes.string.isRequired,
    source: PropTypes.string,
    fallbackSource: PropTypes.string
  }

  constructor() {
    super()
    this.state = {
      imageLoaded: false
    }
    this.onPollSuccess = this.onPollSuccess.bind(this)
    this.pollHandle = createPollHandle(this.onPollSuccess)
  }

  componentWillMount() {
    const source = this.props.source

    if (source) {
      this.startLoading(source)
    }
  }

  componentWillReceiveProps(nextProps) {
    const source = nextProps.source

    if (source && source !== this.props.source) {
      this.startLoading(source)
    }

    if (!source && source !== this.props.source) {
      this.setState({
        imageLoaded: false
      })
    }
  }

  componentWillUnmount() {
    this.pollHandle.dispose()
  }

  onPollSuccess() {
    this.setState({
      imageLoaded: true
    })
  }

  startLoading(source) {
    this.pollHandle.startPoll(source)
    this.setState({
      imageLoaded: false
    })
  }

  render() {
    const {source, fallbackSource, modifiers = [], classNames, alt} = this.props
    const {imageLoaded} = this.state

    const finalModifiers = source ? modifiers : ['no-source', ...modifiers]

    return (
      <div className={buildClassName('image-container', finalModifiers, classNames)}>
        {imageLoaded && <img className="image-container__image" src={source} alt={alt} />}
        {!imageLoaded && fallbackSource && (
          <img className="image-container__image" src={fallbackSource} alt={alt} />
        )}
      </div>
    )
  }
}
