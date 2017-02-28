import React, {PropTypes} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const ModelItemList = ({classNames, modifiers, children}) => {
  const modifiedChildren = React.Children.map(children, child => (
    <li className="model-item-list__item" key={child.props.label}>{child}</li>
  ))

  return (
    <ul className={buildClassName('model-item-list', modifiers, classNames)}>
      {modifiedChildren}
    </ul>
  )
}

ModelItemList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default ModelItemList
