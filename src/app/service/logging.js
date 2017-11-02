import Raven from 'raven-js'
import createRavenMiddleware from 'raven-for-redux'

import config from '../../../config'

if (process.env.NODE_ENV === 'production') {
  Raven.config(config.raven).install()
}

export const captureException = exception => Raven && Raven.captureException(exception)
export const setUserContext = user => Raven && Raven.setUserContext(user)
export const showReportDialog = () => Raven && Raven.showReportDialog()
export const createReduxMiddleware = createRavenMiddleware(Raven, {})
