import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

import deleteIcon from '../../asset/icon/delete.svg'

const ModelItemLoad = ({
  classNames,
  modifiers,
  title,
  subline,
  status,
  onDelete = () => {}
}) => {
  const handleDeleteClick = (event) => {
    event.preventDefault()
    onDelete()
  }

  const percentage = Math.round(status * 100)

  return (
    <div className={buildClassName('model-item-load', modifiers, classNames)}>

      <div className="model-item-load__description">
        {Boolean(title) && (
          <strong className="model-item-load__title">{title} ({percentage}%)</strong>
        )}
        {Boolean(subline) && (
          <span className="model-item-load__subline">{subline}</span>
        )}
      </div>
      <button type="button" className="model-item-load__delete" onClick={handleDeleteClick}>
        <Icon source={deleteIcon} />
      </button>
      <div
        className="model-item-load__progress"
        style={{transform: `scaleX(${status})`, WebkitTransform: `scaleX(${status})`}}
      />
    </div>
  )
}

ModelItemLoad.propTypes = {
  ...propTypes.component,
  title: PropTypes.string,
  subline: PropTypes.string,
  onDelete: PropTypes.func,
  status: PropTypes.number
}

export default ModelItemLoad
