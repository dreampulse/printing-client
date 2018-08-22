import Raven from 'raven-js'
import createRavenMiddleware from 'raven-for-redux'

import config from '../../../config'

if (process.env.NODE_ENV === 'production') {
  Raven.config(config.ravenUrl, {
    release: config.ravenRelease,
    environment: process.env.NODE_ENV
  }).install()
}

export const setUserContext = userId =>
  Raven &&
  Raven.setUserContext({
    userId
  })
export const ravenMiddleware = createRavenMiddleware(Raven, {})
