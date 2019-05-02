import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const ButtonBar = ({classNames, children, l = false}) => (
  <div className={cn('ButtonBar', {l}, classNames)}>{children}</div>
)

ButtonBar.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  l: PropTypes.bool
}

export default ButtonBar
