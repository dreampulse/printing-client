import Raven from 'raven-js'

import config from '../../../config'

Raven.config(config.raven).install()

export const captureException = execption => Raven.captureException(execption)
