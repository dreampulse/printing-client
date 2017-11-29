import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const ProviderList = ({classNames, modifiers, children}) => (
  <table className={buildClassName('provider-list', modifiers, classNames)}>
    <thead>
      <tr className="provider-list__header">
        <th className="provider-list__provider">Provider</th>
        <th className="provider-list__process">Process</th>
        <th className="provider-list__price">Price</th>
        <th className="provider-list__shipping">Shipping</th>
        <th className="provider-list__delivery">Delivery time</th>
        <th className="provider-list__checkout" />
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
)

ProviderList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default ProviderList
