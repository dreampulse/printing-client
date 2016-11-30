import React from 'react'

import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'

const Paragraph = ({classNames, modifiers, children}) => (
  <p className={buildClassName('paragraph', modifiers, classNames)}>
    {children}
  </p>
)

Paragraph.propTypes = {
  ...propTypes.component,
  children: React.PropTypes.node.isRequired
}

export default Paragraph

