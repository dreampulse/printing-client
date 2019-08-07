import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const OfferFooter = ({classNames, children}) => (
  <section className={buildClassName('OfferFooter', {}, classNames)}>{children}</section>
)

OfferFooter.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default OfferFooter
