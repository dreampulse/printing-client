import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const Container = ({classNames, children, full = false, s = false}) => (
  <div className={cn('container', {full, s}, classNames)}>{children}</div>
)

Container.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  full: PropTypes.bool,
  s: PropTypes.bool
}

export default Container
