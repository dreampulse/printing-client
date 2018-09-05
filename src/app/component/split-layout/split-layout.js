import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const SplitLayout = ({classNames, modifiers, leftContent, rightContent}) => (
  <section className={buildClassName('split-layout', modifiers, classNames)}>
    <div className="split-layout__content">{leftContent}</div>
    <div className="split-layout__content">{rightContent}</div>
  </section>
)

SplitLayout.propTypes = {
  ...propTypes.component,
  leftContent: PropTypes.node.isRequired,
  rightContent: PropTypes.node.isRequired
}

export default SplitLayout
