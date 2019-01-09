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
  loadingCheckmark = null
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
        {loadingCheckmark && <div className="price__loading-checkmark">{loadingCheckmark}</div>}
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
  loadingCheckmark: PropTypes.node
}

export default Price
