import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const Baloon = ({classNames, modifiers, children}) => (
  <p className={buildClassName('baloon', modifiers, classNames)}>{children}</p>
)

Baloon.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default Baloon
