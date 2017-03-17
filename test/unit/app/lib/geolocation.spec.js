import {
  getLocationByIp,
  convertPlaceToLocation
} from 'Lib/geolocation'
import * as http from 'Service/http'
import config from '../../../../config'

describe('geolocation lib', () => {
  describe('getLocationByIp()', () => {
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

      const result = await getLocationByIp()
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

      return getLocationByIp()
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

      return getLocationByIp()
        .catch((result) => {
          expect(result, 'to equal', Error('Location detection failed'))
        })
    })
  })

  describe('convertPlaceToLocation()', () => {
    it('converts an example response', () => {
      const exampleResponse = {
        address_components: [{
          long_name: '32',
          short_name: '32',
          types: [
            'street_number'
          ]
        }, {
          long_name: 'Syrlinstraße',
          short_name: 'Syrlinstraße',
          types: [
            'route'
          ]
        }, {
          long_name: 'Ulm',
          short_name: 'Ulm',
          types: [
            'locality',
            'political'
          ]
        }, {
          long_name: 'Tübingen',
          short_name: 'TÜ',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        }, {
          long_name: 'Baden-Württemberg',
          short_name: 'BW',
          types: [
            'administrative_area_level_1',
            'political'
          ]
        }, {
          long_name: 'Deutschland',
          short_name: 'DE',
          types: [
            'country',
            'political'
          ]
        }, {
          long_name: '89073',
          short_name: '89073',
          types: [
            'postal_code'
          ]
        }]
      }

      expect(convertPlaceToLocation(exampleResponse), 'to equal', {
        street: 'Syrlinstraße',
        houseNumber: '32',
        city: 'Ulm',
        zipCode: '89073',
        stateCode: 'BW',
        countryCode: 'DE'
      })
    })

    it('handels missing geo types', () => {
      const exampleResponse = {
        address_components: [{
          long_name: 'Ulm',
          short_name: 'Ulm',
          types: [
            'locality',
            'political'
          ]
        }, {
          long_name: 'Tübingen',
          short_name: 'TÜ',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        }, {
          long_name: 'Baden-Württemberg',
          short_name: 'BW',
          types: [
            'administrative_area_level_1',
            'political'
          ]
        }, {
          long_name: 'Deutschland',
          short_name: 'DE',
          types: [
            'country',
            'political'
          ]
        }]
      }

      expect(convertPlaceToLocation(exampleResponse), 'to equal', {
        street: null,
        houseNumber: null,
        city: 'Ulm',
        zipCode: null,
        stateCode: 'BW',
        countryCode: 'DE'
      })
    })
  })
})
