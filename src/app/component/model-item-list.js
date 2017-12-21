import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const ModelItemList = ({classNames, modifiers, children}) => {
  const modifiedChildren = React.Children.map(children, child => (
    <li className="model-item-list__item" key={child.props.label}>
      {child}
    </li>
  ))

  return (
    <ul className={buildClassName('model-item-list', modifiers, classNames)}>{modifiedChildren}</ul>
  )
}

ModelItemList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default ModelItemList
