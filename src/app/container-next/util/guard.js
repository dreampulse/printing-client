import {compose, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

// Higher order component that enshures that a parameter exists
// It redirects otherwise (by default to `/`)
export const guard = (predicate, redirectRoute = '/') =>
  compose(
    connect(
      state => ({
        guardPassed: predicate(state)
      }),
      {
        pushRoute: push
      }
    ),
    lifecycle({
      componentWillMount() {
        const {guardPassed, pushRoute} = this.props
        if (!guardPassed) {
          pushRoute(redirectRoute)
        }
      }
    })
  )
