import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const RecommendedOfferSection = ({classNames, children}) => (
  <div className={cn('RecommendedOfferSection', {}, classNames)}>{children}</div>
)

RecommendedOfferSection.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default RecommendedOfferSection
