import getLocation from 'Lib/geolocation'
import * as http from 'Service/http'
import config from '../../../../config'

describe('geolocation lib', () => {
  beforeEach(() => {
    sinon.stub(http)
    sinon.stub(config)
  })

  afterEach(() => {
    sinon.restore(http)
    sinon.restore(config)
  })

  it('works for the success case', async () => {
    const geolocationResponse = {
      city: 'Munich',
      zip: '80333',
      region: 'BY',
      countryCode: 'DE'
    }
    http.request.resolves(geolocationResponse)

    const result = await getLocation()
    expect(result, 'to equal', {
      city: 'Munich',
      zipCode: '80333',
      stateCode: 'BY',
      countryCode: 'DE'
    })
  })

  it('aborts request after a configured timeout', () => {
    const endlessPromise = new Promise(() => {})
    http.request.resolves(endlessPromise)
    config.fetchTimout = 1  // faster timeout

    return getLocation()
      .catch((result) => {
        expect(result, 'to equal', Error('Operation timed out'))
      })
  })

  it('handels missing keys in response', async () => {
    const geolocationResponse = {
      city: null,
      zip: null,
      region: null,
      countryCode: null
    }
    http.request.resolves(geolocationResponse)

    return getLocation()
      .catch((result) => {
        expect(result, 'to equal', Error('Location detection failed'))
      })
  })
})
