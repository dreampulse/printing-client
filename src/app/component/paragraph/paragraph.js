import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const Paragraph = ({classNames, children, size = 'default', strong = false, minor = false}) => (
  <p className={cn('Paragraph', {[`size-${size}`]: size, strong, minor}, classNames)}>{children}</p>
)

Paragraph.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['default', 'l']),
  strong: PropTypes.bool,
  minor: PropTypes.bool
}

export default Paragraph
