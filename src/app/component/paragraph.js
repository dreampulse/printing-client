import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const Paragraph = ({classNames, modifiers, children}) => (
  <p className={buildClassName('paragraph', modifiers, classNames)}>{children}</p>
)

Paragraph.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default Paragraph
