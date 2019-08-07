import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const UploadModelList = ({classNames, children, header}) => (
  <div className={cn('UploadModelList', {}, classNames)}>
    <div className="UploadModelList__header">{header}</div>
    <ul className="UploadModelList__list">
      {React.Children.map(children, (child, index) => (
        <li key={`model-item-${index}`} className="UploadModelList__item">
          {child}
        </li>
      ))}
    </ul>
  </div>
)

UploadModelList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired
}

export default UploadModelList
