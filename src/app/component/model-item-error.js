import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'
import ImageContainer from './image-container'

import deleteIcon from '../../asset/icon/delete.svg'

const ModelItemError = ({
  classNames,
  modifiers,
  title,
  imageSource,
  subline,
  onDelete = () => {}
}) => {
  const handleDeleteClick = (event) => {
    event.preventDefault()
    onDelete()
  }

  return (
    <div className={buildClassName('model-item', modifiers, classNames)}>
      <ImageContainer source={imageSource} />
      <div className="model-item__description">
        {Boolean(title) && (
          <strong className="model-item__title">{title}</strong>
        )}
        {Boolean(subline) && (
          <span className="model-item__subline">{subline}</span>
        )}
      </div>
      <button type="button" className="model-item__delete" onClick={handleDeleteClick}>
        <Icon source={deleteIcon} />
      </button>
    </div>
  )
}

ModelItemError.propTypes = {
  ...propTypes.component,
  imageSource: PropTypes.string.isRequired,
  title: PropTypes.string,
  subline: PropTypes.string,
  onDelete: PropTypes.func
}

export default ModelItemError
