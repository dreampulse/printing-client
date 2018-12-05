import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import LoadingIndicator from '../loading-indicator'

const Price = ({
  classNames,
  modifiers,
  value,
  prefix,
  meta,
  loading = false,
  globalLoading = null
}) => (
  <div className={buildClassName('price', modifiers, classNames)}>
    {loading ? (
      <div className="price__loading">
        <LoadingIndicator /> Fetching prices
      </div>
    ) : (
      <div className="price__price">
        {prefix ? <small className="price__prefix">{prefix}</small> : null}
        <div className="price__value">{value}</div>
        {meta ? <small className="price__meta">{meta}</small> : null}
        {globalLoading && <span className="price__global-loading">{globalLoading}</span>}
      </div>
    )}
  </div>
)

Price.propTypes = {
  ...propTypes.component,
  value: PropTypes.string,
  prefix: PropTypes.string,
  meta: PropTypes.string,
  loading: PropTypes.bool,
  globalLoading: PropTypes.node
}

export default Price
