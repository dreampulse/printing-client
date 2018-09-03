import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Container from './container'

const ConfigurationHeader = ({classNames, modifiers, location, currency, text}) => (
  <div className={buildClassName('configuration-header', modifiers, classNames)}>
    <Container>
      <div className="configuration-header__wrapper">
        <div className="configuration-header__location">{location}</div>
        <div className="configuration-header__currency">{currency}</div>
        <div className="configuration-header__text">{text}</div>
      </div>
    </Container>
  </div>
)

ConfigurationHeader.propTypes = {
  ...propTypes.component,
  location: PropTypes.node.isRequired,
  currency: PropTypes.node.isRequired,
  text: PropTypes.node.isRequired
}

export default ConfigurationHeader
