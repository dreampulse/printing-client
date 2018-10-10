import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const ProviderList = ({classNames, modifiers, children}) => (
  <table className={buildClassName('provider-list', modifiers, classNames)}>
    <thead>
      <tr className="provider-list__header">
        <th className="provider-list__provider">Fulfilled by</th>
        <th className="provider-list__time">Delivery time</th>
        <th className="provider-list__price">Price</th>
        <th className="provider-list__icon" />
        <th className="provider-list__action" />
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
