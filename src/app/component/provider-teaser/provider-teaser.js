import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const ProviderTeaser = ({classNames, modifiers, children}) => (
  <section className={buildClassName('provider-teaser', modifiers, classNames)}>{children}</section>
)

ProviderTeaser.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default ProviderTeaser
