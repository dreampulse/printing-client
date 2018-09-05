import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Icon from '../icon'

import deleteIcon from '../../../asset/icon/delete.svg'

const UploadModelItemError = ({classNames, modifiers, title, subline, onDelete = () => {}}) => {
  const handleDeleteClick = event => {
    event.preventDefault()
    onDelete()
  }

  return (
    <div className={buildClassName('upload-model-item-error', modifiers, classNames)}>
      <div className="upload-model-item-error__image" />
      <div className="upload-model-item-error__content">
        {Boolean(title) && <strong className="upload-model-item-error__title">{title}</strong>}
        {Boolean(subline) && <span className="upload-model-item-error__subline">{subline}</span>}
      </div>
      <button type="button" className="upload-model-item-error__delete" onClick={handleDeleteClick}>
        <Icon source={deleteIcon} title="Delete" />
      </button>
    </div>
  )
}

UploadModelItemError.propTypes = {
  ...propTypes.component,
  title: PropTypes.string,
  subline: PropTypes.string,
  onDelete: PropTypes.func
}

export default UploadModelItemError
