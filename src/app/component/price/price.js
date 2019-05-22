import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import LoadingIndicator from '../loading-indicator'

const Price = ({classNames, value, prefix, loading = false, loadingCheckmark = null}) => (
  <div className={cn('Price', {}, classNames)}>
    {loading ? (
      <div className="Price__loading">
        <LoadingIndicator /> Fetching prices
      </div>
    ) : (
      <div className="Price__price">
        {prefix ? <small className="Price__prefix">{prefix}</small> : null}
        <div className="Price__value">{value}</div>
        {loadingCheckmark && <div className="Price__loadingCheckmark">{loadingCheckmark}</div>}
      </div>
    )}
  </div>
)

Price.propTypes = {
  ...propTypes.component,
  value: PropTypes.string,
  prefix: PropTypes.string,
  loading: PropTypes.bool,
  loadingCheckmark: PropTypes.node
}

export default Price
