import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'
import LoadingIndicator from './loading-indicator'

import deleteIcon from '../../asset/icon/delete.svg'

const UploadModelItemLoad = ({
  classNames,
  modifiers,
  title,
  subline,
  status,
  onDelete = () => {}
}) => {
  const handleDeleteClick = event => {
    event.preventDefault()
    onDelete()
  }

  const percentage = Math.round(status * 100)
  const loadTitle = title + (status === undefined ? '…' : ` (${percentage}%)`)
  const scaleX = `scaleX(${status === undefined ? 1 : status})`

  return (
    <div className={buildClassName('upload-model-item-load', modifiers, classNames)}>
      <div className="upload-model-item-load__content">
        {Boolean(title) && (
          <strong className="upload-model-item-load__title">
            {status === undefined && <LoadingIndicator />}
            {loadTitle}
          </strong>
        )}
        {Boolean(subline) && <span className="upload-model-item-load__subline">{subline}</span>}
      </div>
      <button type="button" className="upload-model-item-load__delete" onClick={handleDeleteClick}>
        <Icon source={deleteIcon} title="Delete" />
      </button>
      <div
        className="upload-model-item-load__progress"
        style={{
          transform: scaleX,
          WebkitTransform: scaleX,
          opacity: status === undefined ? 0.5 : 1
        }}
      />
    </div>
  )
}

UploadModelItemLoad.propTypes = {
  ...propTypes.component,
  title: PropTypes.string,
  subline: PropTypes.string,
  onDelete: PropTypes.func,
  status: PropTypes.number
}

export default UploadModelItemLoad
