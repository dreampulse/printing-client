import React, {PropTypes, cloneElement} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const ModelItemList = ({classNames, modifiers, children}) => {
  const modifiedChildren = React.Children.map(children, (child, index) => (
    cloneElement(child, {
      key: child.props.label
    })
  ))

  return (
    <div className={buildClassName('model-item-list', modifiers, classNames)}>
      {modifiedChildren}
    </div>
  )
}

ModelItemList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  currentStep: PropTypes.number
}

export default ModelItemList
