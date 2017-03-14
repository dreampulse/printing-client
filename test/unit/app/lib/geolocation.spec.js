import {getLocation} from 'Lib/geolocation'
import * as http from 'Service/http'
import config from '../../../../config'

describe('geolocation lib', () => {
  let configSandbox

  beforeEach(() => {
    sinon.stub(http)
    configSandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sinon.restore(http)
    configSandbox.restore()
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
    configSandbox.stub(config, 'fetchTimout', 1)  // Faster timeout

    return getLocation()
      .catch((result) => {
        expect(result, 'to equal', Error('Operation timed out'))
      })
  })

  it('handels a missing keys in response', async () => {
    const geolocationResponse = {
      city: 'something',
      zip: 'something',
      region: 'something',
      countryCode: null  // A key is missing
    }
    http.request.resolves(geolocationResponse)

    return getLocation()
      .catch((result) => {
        expect(result, 'to equal', Error('Location detection failed'))
      })
  })
})
