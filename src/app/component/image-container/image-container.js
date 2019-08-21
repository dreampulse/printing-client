import PropTypes from 'prop-types'
import React, {Component} from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import {createPollHandle} from '../../service/image'

export default class ImageContainer extends Component {
  static propTypes = {
    ...propTypes.component,
    // Required for a11y purposes
    alt: PropTypes.string.isRequired,
    source: PropTypes.string,
    fallbackSource: PropTypes.string,
    ratio: PropTypes.oneOf(['default', '1-1'])
  }

  static defaultProps = {
    ratio: 'default'
  }

  constructor() {
    super()
    this.pollHandle = createPollHandle(this.onPollSuccess)
  }

  state = {
    imageLoaded: false
  }

  componentDidMount() {
    const source = this.props.source

    if (source) {
      this.startLoading(source)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.source === prevProps.source) {
      return
    }

    if (this.props.source) {
      this.startLoading(this.props.source)
    } else {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        imageLoaded: false
      })
    }
  }

  componentWillUnmount() {
    this.pollHandle.dispose()
  }

  onPollSuccess = () => {
    this.setState({
      imageLoaded: true
    })
  }

  startLoading = source => {
    this.pollHandle.startPoll(source)
    this.setState({
      imageLoaded: false
    })
  }

  render() {
    const {source, fallbackSource, ratio, classNames, alt} = this.props
    const {imageLoaded} = this.state

    return (
      <div
        className={cn(
          'ImageContainer',
          {noSource: !source, [`ratio-${ratio}`]: !!ratio},
          classNames
        )}
      >
        {imageLoaded && <img className="ImageContainer__image" src={source} alt={alt} />}
        {!imageLoaded && fallbackSource && (
          <img className="ImageContainer__image" src={fallbackSource} alt={alt} />
        )}
      </div>
    )
  }
}
