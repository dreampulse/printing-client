import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const ModelUploadList = ({classNames, children, uploadArea}) => (
  <div className={cn('ModelUploadList', {}, classNames)}>
    <ul className="ModelUploadList__items">
      <li className="ModelUploadList__uploadArea">{uploadArea}</li>
      {React.Children.map(children, (child, index) => (
        <li key={`model-item-${index}`} className="ModelUploadList__item">
          {child}
        </li>
      ))}
    </ul>
  </div>
)

ModelUploadList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  uploadArea: PropTypes.node.isRequired
}

export default ModelUploadList
