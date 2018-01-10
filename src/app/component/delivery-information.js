import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const DeliveryInformation = ({classNames, modifiers, duration, provider = ''}) => (
  <div className={buildClassName('delivery-information', modifiers, classNames)}>
    <span className="delivery-information__duration">{duration}</span>
    {provider && <span className="delivery-information__provider">{provider}</span>}
  </div>
)

DeliveryInformation.propTypes = {
  ...propTypes.component,
  duration: PropTypes.string.isRequired,
  provider: PropTypes.string
}

export default DeliveryInformation
