import React from 'react'

import enhanceClassName from '../lib/enhance-class-name'

const ContextMenuList = ({children, ...params}) => (
  <ul {...params}>
    {children.map((child, index) =>
      <li key={index}>{child}</li>
    )}
  </ul>
)

ContextMenuList.propTypes = {
  children: React.PropTypes.node
}

export default enhanceClassName('context-menu-list')(ContextMenuList)
