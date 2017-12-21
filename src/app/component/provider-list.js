import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const ProviderList = ({classNames, modifiers, children, providerInfo}) => (
  <table className={buildClassName('provider-list', modifiers, classNames)}>
    <thead>
      <tr className="provider-list__header">
        <th className="provider-list__provider">
          Provider
          {providerInfo}
        </th>
        <th className="provider-list__price">Price incl. Shipping</th>
        <th className="provider-list__shipping">Shipping Partner</th>
        <th className="provider-list__checkout" />
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
)

ProviderList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  providerInfo: PropTypes.node
}

export default ProviderList
