import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const Container = ({classNames, children, full = false}) => (
  <div className={cn('container', {full}, classNames)}>{children}</div>
)

Container.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  full: PropTypes.bool
}

export default Container
