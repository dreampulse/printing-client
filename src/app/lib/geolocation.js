import {request} from 'Service/http'
import timeout from './timeout'
import config from '../../../config'

const URL = 'http://ip-api.com/json'

export default async () => {
  const {
    city,
    zip,
    region,
    countryCode
  } = await timeout(request(URL), config.fetchTimout)

  /* istanbul ignore next */
  if (!city || !zip || !region || !countryCode) {
    throw new Error('Location detection failed')
  }

  return {
    city,
    zipCode: zip,
    stateCode: region,
    countryCode
  }
}
