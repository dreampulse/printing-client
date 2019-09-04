import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const StickyFooter = ({classNames, children}) => (
  <div className={buildClassName('StickyFooter', {}, classNames)}>
    <div className="StickyFooter__content">{children}</div>
  </div>
)

StickyFooter.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default StickyFooter
