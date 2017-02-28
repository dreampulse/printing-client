import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import ImageContainer from './image-container'
import NumberField from './number-field'
import Icon from './icon'
import Price from './price'

import deleteIcon from '../../asset/icon/delete.svg'

const ModelQuantityItem = ({
  classNames,
  modifiers,
  imageSource,
  quantity,
  title,
  onQuantityChange = () => {},
  onDelete = () => {}
}) => {
  const handleDeleteClick = (event) => {
    event.preventDefault()
    onDelete()
  }

  return (
    <div className={buildClassName('model-quantity-item', modifiers, classNames)}>
      <ImageContainer source={imageSource} />
      <div className="model-quantity-item__body">
        <div className="model-quantity-item__title">
          {title}
        </div>
        <NumberField modifiers={['compact']} value={quantity} onChange={onQuantityChange} />
      </div>
      <Price value="$29.33" />
      <button type="button" className="model-quantity-item__delete" onClick={handleDeleteClick}>
        <Icon source={deleteIcon} />
      </button>
    </div>
  )
}

ModelQuantityItem.propTypes = {
  ...propTypes.component,
  imageSource: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  title: PropTypes.string,
  subline: PropTypes.string,
  onQuantityChange: PropTypes.func,
  onDelete: PropTypes.func
}

export default ModelQuantityItem
