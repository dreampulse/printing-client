import PropTypes from 'prop-types'
import React from 'react'
import noop from 'lodash/noop'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'
import Icon from '../icon'
import Progress from '../progress'

import deleteIcon from '../../../asset/icon/delete.svg'
import LoadingIndicator from '../loading-indicator'

const UploadModelItemLoad = ({classNames, status, title, subline, onDelete = noop}) => {
  const percentage = Math.round(status * 100)

  const titleContent =
    status !== undefined ? (
      `${title} (${percentage}%)`
    ) : (
      <>
        <LoadingIndicator />
        {title}
      </>
    )

  return (
    <div className={cn('UploadModelItemLoad', {}, classNames)}>
      <div className="UploadModelItemLoad__title">{titleContent}</div>
      <div className="UploadModelItemLoad__subline">{subline}</div>
      {status !== undefined && (
        <div className="UploadModelItemLoad__progress">
          <Progress value={percentage} />
        </div>
      )}
      <button type="button" className="UploadModelItemLoad__button" onClick={onDelete}>
        <Icon source={deleteIcon} title="Delete" />
      </button>
    </div>
  )
}

UploadModelItemLoad.propTypes = {
  ...propTypes.component,
  status: PropTypes.number,
  title: PropTypes.string.isRequired,
  subline: PropTypes.string.isRequired,
  onDelete: PropTypes.func
}

export default UploadModelItemLoad
