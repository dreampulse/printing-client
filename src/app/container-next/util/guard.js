import React from 'react'
import {compose, branch, renderComponent} from 'recompose'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {push} from 'react-router-redux'

const createRedirectHoc = redirectRoute => () => <Redirect to={redirectRoute} />

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
    branch(({guardPassed}) => !guardPassed, renderComponent(createRedirectHoc(redirectRoute)))
  )
