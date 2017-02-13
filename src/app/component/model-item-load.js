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

  const percentage = status * 100

  return (
    <div className={buildClassName('model-item', modifiers, classNames)}>

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
      <div className="model-item__wrapper" style={{width: percentage + '%'}} />
    </div>
  )
}

ModelItemLoad.propTypes = {
  ...propTypes.component,
  title: PropTypes.string,
  subline: PropTypes.string,
  onDelete: PropTypes.func
}

export default ModelItemLoad
