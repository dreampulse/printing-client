import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Icon from '../icon'
import LoadingIndicator from '../loading-indicator'
import Progress from '../progress'

import deleteIcon from '../../../asset/icon/delete.svg'

const DeprecatedUploadModelItemLoad = ({
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

  return (
    <div className={buildClassName('deprecated-upload-model-item-load', modifiers, classNames)}>
      {status !== undefined && <Progress value={percentage} />}
      <div className="deprecated-upload-model-item-load__content">
        {Boolean(title) && (
          <strong className="deprecated-upload-model-item-load__title">
            {status === undefined && <LoadingIndicator />}
            {loadTitle}
          </strong>
        )}
        {Boolean(subline) && (
          <span className="deprecated-upload-model-item-load__subline">{subline}</span>
        )}
      </div>
      <button
        type="button"
        className="deprecated-upload-model-item-load__delete"
        onClick={handleDeleteClick}
      >
        <Icon source={deleteIcon} title="Delete" />
      </button>
    </div>
  )
}

DeprecatedUploadModelItemLoad.propTypes = {
  ...propTypes.component,
  title: PropTypes.string,
  subline: PropTypes.string,
  onDelete: PropTypes.func,
  status: PropTypes.number
}

export default DeprecatedUploadModelItemLoad
