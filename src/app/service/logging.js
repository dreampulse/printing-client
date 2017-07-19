import Raven from 'raven-js'

import config from '../../../config'

if (process.env.NODE_ENV === 'production') {
  Raven.config(config.raven).install()
}

export const captureException = execption => Raven && Raven.captureException(execption)
export const setUserContext = user => Raven && Raven.setUserContext(user)
