import * as Sentry from '@sentry/browser'
import createSentryMiddleware from 'redux-sentry-middleware'

import config from '../../../config'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({dsn: config.sentryDns, release: config.sentryRelease})
}

export const setUserContext = (userId: string) =>
  Sentry &&
  Sentry.setUser({
    userId
  })

export const captureException = (error: Error) => Sentry && Sentry.captureException(error)

export const ravenMiddleware = createSentryMiddleware(Sentry, {})
