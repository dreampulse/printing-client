import { getLocation } from '../../../../src/app/service/geolocation'

describe('Geolocation Integration Test', () => {
  describe('getLocation()', () => {
    it('should work', async () => {
      const location = await getLocation()
      expect(location.city, 'to be ok')
      expect(location.zipCode, 'to be ok')
      expect(location.stateCode, 'to be ok')
      expect(location.countryCode, 'to be ok')
    })
  })
})
