import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const ProviderList = ({classNames, modifiers, children}) => (
  <table className={buildClassName('provider-list', modifiers, classNames)}>
    <thead>
      <tr className="provider-list__header">
        <th className="provider-list__provider">Provider</th>
        <th className="provider-list__total-price">Total price</th>
        <th className="provider-list__price">Production price</th>
        <th className="provider-list__shipping">Shipping price</th>
        <th className="provider-list__production-time">Production time</th>
        <th className="provider-list__process">Production process</th>
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
