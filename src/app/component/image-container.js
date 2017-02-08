import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import LoadingIndicator from './loading-indicator'

const ImageContainer = ({classNames, modifiers, source}) => {
  const style = {}
  if (source) {
    style.backgroundImage = `url(${source})`
  }

  return (
    <div className={buildClassName('image-container', modifiers, classNames)}>
      <div
        className="image-container__content"
        style={style}
      >
        {!source && <LoadingIndicator modifiers={['invert']} />}
      </div>
    </div>
  )
}

ImageContainer.propTypes = {
  ...propTypes.component,
  source: PropTypes.string
}

export default ImageContainer
