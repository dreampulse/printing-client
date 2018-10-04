import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const ProviderBoxSection = ({classNames, modifiers = [], children}) => (
  <div className={buildClassName('provider-box-section', modifiers, classNames)}>{children}</div>
)

ProviderBoxSection.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default ProviderBoxSection
