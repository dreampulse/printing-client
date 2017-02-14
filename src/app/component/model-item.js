import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import ImageContainer from './image-container'
import NumberField from './number-field'
import Icon from './icon'

import deleteIcon from '../../asset/icon/delete.svg'

const ModelItem = ({
  classNames,
  modifiers,
  imageSource,
  quantity,
  title,
  subline,
  onQuantityChange = () => {},
  onDelete = () => {}
}) => {
  const handleDeleteClick = (event) => {
    event.preventDefault()
    onDelete()
  }

  return (
    <div className={buildClassName('model-item', modifiers, classNames)}>
      <ImageContainer source={imageSource} />
      <NumberField modifiers={['compact']} value={quantity} onChange={onQuantityChange} />
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

ModelItem.propTypes = {
  ...propTypes.component,
  imageSource: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  title: PropTypes.string,
  subline: PropTypes.string,
  onQuantityChange: PropTypes.func,
  onDelete: PropTypes.func
}

export default ModelItem
