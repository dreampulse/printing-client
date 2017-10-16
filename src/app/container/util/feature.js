import {withProps, compose} from 'recompose'
import {connect} from 'react-redux'

import {selectFeatures} from 'Lib/selector'

// Higher order component used for feature toggles based on query parameters
export const getFeatures = compose(
  connect(s => s),
  withProps(state => ({features: selectFeatures(state)}))
)
