import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const ButtonBar = ({classNames, modifiers = [], children}) => (
  <div className={buildClassName('button-bar', modifiers, classNames)}>{children}</div>
)

ButtonBar.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default ButtonBar
