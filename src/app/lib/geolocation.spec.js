import {getLocationFromCookie, convertPlaceToLocation, isLocationValid} from './geolocation'
import config from '../../../config'
import * as cookie from '../service/cookie'

describe('geolocation lib', () => {
  describe('getLocationFromCookie()', () => {
    let sandbox

    beforeEach(() => {
      sandbox = sinon.sandbox.create()
      sandbox.stub(cookie)
      sandbox.stub(config, 'countryCookie').value('country')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('returns location with countryCode from cookie', () => {
      cookie.getCookie.withArgs('country').returns('DE')

      const result = getLocationFromCookie()
      expect(result, 'to equal', {
        city: null,
        zipCode: null,
        stateCode: null,
        countryCode: 'DE'
      })
    })

    it('returns location with countryCode in uppercase', () => {
      cookie.getCookie.withArgs('country').returns('de')

      const result = getLocationFromCookie()
      expect(result, 'to equal', {
        city: null,
        zipCode: null,
        stateCode: null,
        countryCode: 'DE'
      })
    })

    it('throw error when cookie not found', async () => {
      cookie.getCookie.withArgs('country').returns(undefined)

      expect(getLocationFromCookie, 'to throw error', Error('Location detection failed'))
    })
  })

  describe('convertPlaceToLocation()', () => {
    it('converts an example response', () => {
      const exampleResponse = {
        address_components: [
          {
            long_name: '32',
            short_name: '32',
            types: ['street_number']
          },
          {
            long_name: 'Syrlinstraße',
            short_name: 'Syrlinstraße',
            types: ['route']
          },
          {
            long_name: 'Ulm',
            short_name: 'UL',
            types: ['locality', 'political']
          },
          {
            long_name: 'Tübingen',
            short_name: 'TÜ',
            types: ['administrative_area_level_2', 'political']
          },
          {
            long_name: 'Baden-Württemberg',
            short_name: 'BW',
            types: ['administrative_area_level_1', 'political']
          },
          {
            long_name: 'Deutschland',
            short_name: 'DE',
            types: ['country', 'political']
          },
          {
            long_name: '89073',
            short_name: '89073',
            types: ['postal_code']
          }
        ]
      }

      expect(convertPlaceToLocation(exampleResponse), 'to equal', {
        city: 'Ulm',
        zipCode: '89073',
        stateCode: 'BW',
        countryCode: 'DE'
      })
    })

    it('handles missing geo types', () => {
      const exampleResponse = {
        address_components: [
          {
            long_name: 'Tübingen',
            short_name: 'TÜ',
            types: ['administrative_area_level_2', 'political']
          },
          {
            long_name: 'Baden-Württemberg',
            short_name: 'BW',
            types: ['administrative_area_level_1', 'political']
          },
          {
            long_name: 'Deutschland',
            short_name: 'DE',
            types: ['country', 'political']
          }
        ]
      }

      expect(convertPlaceToLocation(exampleResponse), 'to equal', {
        city: '',
        zipCode: '',
        stateCode: 'BW',
        countryCode: 'DE'
      })
    })

    it('handles empty object', () => {
      expect(convertPlaceToLocation({}), 'to equal', {
        city: '',
        zipCode: '',
        stateCode: '',
        countryCode: ''
      })
    })

    it('handles missing property', () => {
      const exampleResponse = {
        address_components: [
          {
            short_name: 'UL',
            types: ['locality', 'political']
          },
          {
            short_name: 'TÜ',
            types: ['administrative_area_level_2', 'political']
          },
          {
            short_name: 'BW',
            types: ['administrative_area_level_1', 'political']
          },
          {
            short_name: 'DE',
            types: ['country', 'political']
          }
        ]
      }

      expect(convertPlaceToLocation(exampleResponse), 'to equal', {
        city: '',
        zipCode: '',
        stateCode: 'BW',
        countryCode: 'DE'
      })
    })

    it('handles GB addresses differently', () => {
      const exampleResponse = {
        address_components: [
          {
            long_name: 'Dundee',
            short_name: 'Dundee',
            types: ['locality', 'political']
          },
          {
            long_name: 'Dundee City',
            short_name: 'Dundee City',
            types: ['administrative_area_level_2', 'political']
          },
          {
            long_name: 'Scotland',
            short_name: 'Scotland',
            types: ['administrative_area_level_1', 'political']
          },
          {
            long_name: 'United Kingdom',
            short_name: 'GB',
            types: ['country', 'political']
          },
          {
            long_name: 'DD3 7HZ',
            short_name: 'DD3 7HZ',
            types: ['postal_code']
          }
        ]
      }

      expect(convertPlaceToLocation(exampleResponse), 'to equal', {
        city: 'Dundee',
        zipCode: 'DD3 7HZ',
        stateCode: 'Dundee City',
        countryCode: 'GB'
      })
    })
  })

  describe('isLocationValid()', () => {
    it('checks that all necessary keys exists', () => {
      const location = {
        city: 'some-city',
        zipCode: 'some-zip-code'
        // countryCode is missing
      }

      expect(isLocationValid(location), 'to be', false)
    })

    it('returns true if all necessary keys are there', () => {
      const location = {
        city: 'some-city',
        zipCode: 'some-zip-code',
        countryCode: 'DE'
      }

      expect(isLocationValid(location), 'to be', true)
    })
  })
})
