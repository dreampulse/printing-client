import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const ProviderDefinitionList = ({classNames, modifiers, providerValues}) => (
  <dl className={buildClassName('provider-definition-list', modifiers, classNames)}>
    {Object.keys(providerValues).map(providerName => [
      <dt className="provider-definition-list__term" key={providerName}>
        {providerName}
      </dt>,
      <dd className="provider-definition-list__definition" key={`${providerName}-values`}>
        {providerValues[providerName]
          .map(value => (
            <span key={value} className="provider-definition-list__value">
              {value}
            </span>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])}
      </dd>
    ])}
  </dl>
)

ProviderDefinitionList.propTypes = {
  ...propTypes.component,
  providerValues: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
}

export default ProviderDefinitionList
