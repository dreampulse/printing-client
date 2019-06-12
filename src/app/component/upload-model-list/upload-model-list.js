import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const UploadModelList = ({classNames, children}) => (
  <ul className={cn('UploadModelList', {}, classNames)}>
    {React.Children.map(children, (child, index) => (
      <li key={`model-item-${index}`} className="UploadModelList__item">
        {child}
      </li>
    ))}
  </ul>
)

UploadModelList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default UploadModelList
