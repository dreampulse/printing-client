import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const ConfigurationHeader = ({classNames, location, currency, text}) => (
  <div className={cn('ConfigurationHeader', {}, classNames)}>
    <div className="ConfigurationHeader__wrapper">
      <div className="ConfigurationHeader__location">{location}</div>
      <div className="ConfigurationHeader__currency">{currency}</div>
      <div className="ConfigurationHeader__text">{text}</div>
    </div>
  </div>
)

ConfigurationHeader.propTypes = {
  ...propTypes.component,
  location: PropTypes.node.isRequired,
  currency: PropTypes.node.isRequired,
  text: PropTypes.node.isRequired
}

export default ConfigurationHeader
