import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const MaterialStepSection = ({classNames, children, headline, fadeIn = false}) => (
  <div className={cn('MaterialStepSection', {fadeIn}, classNames)}>
    {headline}
    <div className="MaterialStepSection__content">{children}</div>
  </div>
)

MaterialStepSection.propTypes = {
  ...propTypes.component,
  headline: PropTypes.node.isRequired,
  children: PropTypes.node,
  fadeIn: PropTypes.bool
}

export default MaterialStepSection
