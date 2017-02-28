import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const ModelQuantityItemList = ({classNames, modifiers, children}) => {
  const modifiedChildren = React.Children.map(children, child => (
    <li className="model-quantity-item-list__item" key={child.key}>{child}</li>
  ))

  return (
    <ul className={buildClassName('model-quantity-item-list', modifiers, classNames)}>
      {modifiedChildren}
    </ul>
  )
}

ModelQuantityItemList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default ModelQuantityItemList
