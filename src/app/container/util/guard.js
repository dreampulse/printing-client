import React from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import branch from 'recompose/branch'
import renderComponent from 'recompose/renderComponent'
import {Redirect} from 'react-router'

const createRedirectHoc = redirectRoute => () => <Redirect to={redirectRoute} />

// Higher order component that enshures that a parameter exists
// It redirects otherwise (by default to `/`)
export const guard = (predicate, redirectRoute = '/') =>
  compose(
    withState('guardPassed', 'setGuardPassed', predicate),
    branch(({guardPassed}) => !guardPassed, renderComponent(createRedirectHoc(redirectRoute)))
  )
