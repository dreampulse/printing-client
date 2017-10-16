import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Icon from 'Component/icon'

import deleteIcon from 'Icon/delete.svg'

const ModelItemError = ({
  classNames,
  modifiers,
  title,
  subline,
  onDelete = () => {}
}) => {
  const handleDeleteClick = (event) => {
    event.preventDefault()
    onDelete()
  }

  return (
    <div className={buildClassName('model-item-error', modifiers, classNames)}>
      <div className="model-item-error__image" />
      <div className="model-item-error__description">
        {Boolean(title) && (
          <strong className="model-item-error__title">{title}</strong>
        )}
        {Boolean(subline) && (
          <span className="model-item-error__subline">{subline}</span>
        )}
      </div>
      <button type="button" className="model-item-error__delete" onClick={handleDeleteClick}>
        <Icon source={deleteIcon} />
      </button>
    </div>
  )
}

ModelItemError.propTypes = {
  ...propTypes.component,
  title: PropTypes.string,
  subline: PropTypes.string,
  onDelete: PropTypes.func
}

export default ModelItemError
