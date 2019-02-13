import PropTypes from 'prop-types'
import React from 'react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import defaultProps from 'recompose/defaultProps'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import CheckboxField from '../checkbox-field'

const UploadModelList = ({classNames, modifiers, children, uploadArea}) => {
  const numChildren = React.Children.count(children)

  return (
    <div className={buildClassName('upload-model-list', modifiers, classNames)}>
      <ul className="upload-model-list__items">
        <li className="upload-model-list__uploadArea">{uploadArea}</li>
        {React.Children.map(children, (child, index) => (
          <li key={index} className="upload-model-list__item">
            {child}
          </li>
        ))}
      </ul>
    </div>
  )
}

UploadModelList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  uploadArea: PropTypes.node.isRequired
}

export default UploadModelList
