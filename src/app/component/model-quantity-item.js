import React, {PropTypes} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import ImageContainer from 'Component/image-container'
import Link from 'Component/link'
import Icon from 'Component/icon'
import Price from 'Component/price'

import deleteIcon from 'Icon/delete.svg'

const ModelQuantityItem = ({
  classNames,
  modifiers,
  imageSource,
  quantity,
  title,
  subline,
  price,
  onQuantityChange,
  onDelete
}) => {
  const handleDeleteClick = (event) => {
    event.preventDefault()
    onDelete()
  }

  return (
    <div className={buildClassName('model-quantity-item', modifiers, classNames)}>
      <ImageContainer modifiers={['model']} source={imageSource} />
      <div className="model-quantity-item__body">
        <div className="model-quantity-item__title">
          {title}
        </div>
        {Boolean(subline) && (
          <div className="model-quantity-item__subline">{subline}</div>
        )}
        <div className="model-quantity-item__quantity">
          Quantity: {quantity} {onQuantityChange && <Link label="change quantity" onClick={onQuantityChange} />}
        </div>
      </div>
      <Price value={price} />
      {onDelete && (
        <button type="button" className="model-quantity-item__delete" onClick={handleDeleteClick}>
          <Icon source={deleteIcon} />
        </button>
      )}
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
  onDelete: PropTypes.func,
  price: PropTypes.string
}

export default ModelQuantityItem
