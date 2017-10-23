import {compose, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import {replace} from 'react-router-redux'

// Higher order component that enshures that a parameter exists
// It redirects otherwise (by default to `/`)
export const guard = (predicate, redirectRoute = '/') =>
  compose(
    connect(
      state => ({
        guardPassed: predicate(state)
      }),
      {
        replaceRoute: replace
      }
    ),
    lifecycle({
      componentWillMount() {
        const {guardPassed, replaceRoute} = this.props
        if (!guardPassed) {
          replaceRoute(redirectRoute)
        }
      }
    })
  )
