import {fetch, checkStatus} from './http'

const url = 'http://ip-api.com/json'

export const getLocation = async () => {
  const response = await fetch(url)
  const {
    status,
    city,
    zip,
    region,
    countryCode
  } = await checkStatus(response)

  if (status !== 'success' ||
      !city || !zip || !region || !countryCode) {
    throw new Error('Location detection failed')
  }

  return {
    city,
    zipCode: zip,
    stateCode: countryCode === 'US' ? region : '',
    countryCode
  }
}
