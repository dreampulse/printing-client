import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const ModelUploadList = ({classNames, children}) => (
  <ul className={cn('ModelUploadList', {}, classNames)}>
    {React.Children.map(children, (child, index) => (
      <li key={`model-item-${index}`} className="ModelUploadList__item">
        {child}
      </li>
    ))}
  </ul>
)

ModelUploadList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default ModelUploadList
