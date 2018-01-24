import PropTypes from 'prop-types'
import React from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import ImageContainer from './image-container'

const UploadModelItem = ({
  classNames,
  modifiers = [],
  imageSource,
  title,
  subline,
  quantity,
  isButtonBarVisible,
  setIsButtonBarVisible,
  buttonBar
}) => {
  const finalModifiers = [
    ...modifiers,
    {
      'show-buttons': isButtonBarVisible
    }
  ]

  return (
    <div
      className={buildClassName('upload-model-item', finalModifiers, classNames)}
      onMouseEnter={() => setIsButtonBarVisible(true)}
      onMouseLeave={() => setIsButtonBarVisible(false)}
    >
      <ImageContainer source={imageSource} />
      <div className="upload-model-item__content">
        {Boolean(title) && <strong className="upload-model-item__title">{title}</strong>}
        {Boolean(subline) && <span className="upload-model-item__subline">{subline}</span>}
        {Boolean(quantity) && <span className="upload-model-item__quantity">Qty: {quantity}</span>}
      </div>
      {buttonBar && <div className="upload-model-item__buttons">{buttonBar}</div>}
    </div>
  )
}

UploadModelItem.propTypes = {
  ...propTypes.component,
  imageSource: PropTypes.string.isRequired,
  title: PropTypes.string,
  subline: PropTypes.string,
  quantity: PropTypes.number,
  buttonBar: PropTypes.node
}

const enhance = compose(withState('isButtonBarVisible', 'setIsButtonBarVisible', true))

export default enhance(UploadModelItem)
