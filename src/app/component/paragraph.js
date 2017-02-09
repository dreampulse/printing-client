import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const Paragraph = ({classNames, modifiers, children}) => (
  <p className={buildClassName('paragraph', modifiers, classNames)}>
    {children}
  </p>
)

Paragraph.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default Paragraph

