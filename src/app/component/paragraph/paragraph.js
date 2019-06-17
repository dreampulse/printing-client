import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const Paragraph = ({classNames, children, l = false, strong = false, minor = false}) => (
  <p className={cn('Paragraph', {l, strong, minor}, classNames)}>{children}</p>
)

Paragraph.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  l: PropTypes.bool,
  strong: PropTypes.bool,
  minor: PropTypes.bool
}

export default Paragraph
