import PropTypes from 'prop-types'
import React from 'react'
import noop from 'lodash/noop'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'
import Icon from '../icon'

import deleteIcon from '../../../asset/icon/delete.svg'

const UploadModelItemError = ({classNames, title, subline, onDelete = noop}) => (
  <div className={cn('UploadModelItemError', {}, classNames)}>
    <div className="UploadModelItemError__title">{title}</div>
    <div className="UploadModelItemError__subline">{subline}</div>
    <button type="button" className="UploadModelItemError__button" onClick={onDelete}>
      <Icon source={deleteIcon} title="Delete" />
    </button>
  </div>
)

UploadModelItemError.propTypes = {
  ...propTypes.component,
  title: PropTypes.string.isRequired,
  subline: PropTypes.string.isRequired,
  onDelete: PropTypes.func
}

export default UploadModelItemError
