import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import LoadingIndicator from 'Component/loading-indicator'

const Price = ({classNames, modifiers, value, meta, loading = false}) => (
  <div className={buildClassName('price', modifiers, classNames)}>
    {
      loading
      ? <div className="price__loading"><LoadingIndicator /> Fetching prices</div>
      : <div className="price__price">
        <div className="price__value">{value}</div>
        {meta ? <small className="price__meta">{meta}</small> : null}
      </div>
    }
  </div>
)

Price.propTypes = {
  ...propTypes.component,
  value: PropTypes.string,
  meta: PropTypes.string,
  loading: PropTypes.bool
}

export default Price
