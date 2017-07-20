import {withProps} from 'recompose'

// Higher order component used for feature toggles based on query parameters
export const getFeatures = () =>
  withProps(({location: {query = {}} = {query: {}}}) => {
    const features = Object.keys(query)
      .filter(name => /^feature:/.test(name))
      .map(name => name.substr('feature:'.length))
      .reduce((agg, name) => {
        agg[name] = true
        return agg
      }, {})

    return {features}
  })
