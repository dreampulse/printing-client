import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import LoadingIndicator from './loading-indicator'

const Price = ({classNames, modifiers, value, meta, loading = false}) => (
  <div className={buildClassName('price', modifiers, classNames)}>
    {
      loading
      ? <div className="price__loading"><LoadingIndicator /> Fetching prices</div>
      : <div className="price__value">{value}{meta ? <small className="price__meta">{meta}</small> : null}</div>
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
