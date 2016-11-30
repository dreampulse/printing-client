import React, {cloneElement} from 'react'

import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'

const TabMenu = ({classNames, modifiers, children, selectedItem, onChange}) => {
  const handleOnClickTabItem = (value) => {
    if (onChange) onChange(value)
  }

  const modifiedChildren = children.map(child =>
    // I assume, that all children are of type <TabItem/>
    cloneElement(child, {
      key: child.props.value,
      modifiers: (child.props.modifiers || []).concat(child.props.value === selectedItem ? ['active'] : []),
      onClick: handleOnClickTabItem,
      classNames: child.props.classNames || []
    })
  )

  return (
    <nav className={buildClassName('tab-menu', modifiers, classNames)}>
      {modifiedChildren}
    </nav>
  )
}

TabMenu.propTypes = {
  ...propTypes.component,
  children: React.PropTypes.node.isRequired,
  selectedItem: React.PropTypes.string,
  onChange: React.PropTypes.func
}

export default TabMenu
